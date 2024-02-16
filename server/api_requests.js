const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

app.use(express.json());
app.use(cors());

const {
  getUsers,
  insertUser,
  getIdUser,
  getUserById
} = require("./dbFunctions");

let apiKey = null;

function getAccesToken() {
  const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const clientId = "0VVD1N5ZCWzpGaMU9ZrkhbyeUjOebGNk";
  const clientSecret = "I7XTv0nte1BJSg8V";

  const bodyParams = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyParams.toString(),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      apiKey = data.access_token;
    });
}

getAccesToken();
setInterval(getAccesToken, 1700 * 1000);

app.post("/authorizationLogin", async (req, res) => {
var autho = true;
try {
  const user = req.body;
  user.password = doCryptMD5Hash(req.body.password);
  const id = await getIdUser(user.mail, user.password);
  const infoUser = await getUserById(id[0].id);
  res.send({
    authorization: autho,
    name: infoUser[0].nombre,
    id: id[0].id,
  });
} catch {
  autho = false;
  res.send({ authorization: autho });
}
});

function doCryptMD5Hash(password) {
var hash = CryptoJS.MD5(password);
return hash.toString();
}

//The function goes
app.post("/Insertuser", async (req, res) => {
const user = req.body;
user.password = doCryptMD5Hash(req.body.password);
await insertUser(user.name, user.surname, user.mail, user.password, user.telefono, user.country, user.cod_country, user.gender);
res.send({ response: "User inserted correctly", userData: user});
});


app.post("/flights", (req, res) => {
  const apiUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers";

  const params = new URLSearchParams(req.body).toString();

  console.log(req.body);

  const url = `${apiUrl}?${params.toString()}`;
  console.log(url);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/hotelsListing", async (req, res) => {
  const apiUrl =
    "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";

  const params = new URLSearchParams(req.body.listing[0]).toString();

  const url = `${apiUrl}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }).catch((error) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  });

  const hotelsData = await response.json();

  let hotelIds = hotelsData.data.map((hotel) => hotel.hotelId);

  let paramsOffer = new URLSearchParams(req.body.offer[0]).toString();
  let hotelOffersData = [];

  for (let i = 0; i < hotelIds.length; i++) {
    let modifiedParams =
      paramsOffer.slice(0, 9) + hotelIds[i] + paramsOffer.slice(9);

    const offerUrl = `https://test.api.amadeus.com/v3/shopping/hotel-offers?${modifiedParams}`;

    const offerResponse = await fetch(offerUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });

    const offerData = await offerResponse.json();

    if (offerData.data) {
      hotelOffersData.push(offerData.data);
    }
  }

  res.json(hotelOffersData);
});

app.post("/hotelOffers", (req, res) => {
  const apiUrl = "https://test.api.amadeus.com/v3/shopping/hotel-offers";

  const params = new URLSearchParams(req.body).toString();
  console.log(params);

  const url = `${apiUrl}?${params.toString()}`;
  console.log(url);
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/cityCodes", (req, res) => {
  res.sendFile(__dirname + "/cityCodes.json");
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on http://tsg5.dam.inspedralbes.cat:${port}`);
});
