const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");

app.use(express.json());
app.use(cors());

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

app.post("/flights", (req, res) => {
  const apiUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers";

  const params = new URLSearchParams(req.body).toString();

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

app.get("/hotelsListing", (req, res) => {
  const apiUrl =
    "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";

  console.log(req.body);
  const params = new URLSearchParams(req.body).toString();

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

app.get("/hotelOffers", (req, res) => {
  const apiUrl = "https://test.api.amadeus.com/v3/shopping/hotel-offers";

  const params = new URLSearchParams(req.body).toString();

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

app.get("/cityCodes", (req, res) => {
  res.sendFile(__dirname + "/cityCodes.json");
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
