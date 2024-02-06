const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const CryptoJS = require("crypto-js");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { Server } = require("socket.io");
const { spawn } = require("child_process");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.json());
app.use(
  session({
    secret: "miSecreto",
    resave: false,
    saveUninitialized: true,
  })
);

const {
    getUsers,
    insertUser,
    getIdUser,
    getUserById
  } = require("./dbFunctions");


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

io.on("connection", async (socket) => {
  socket.on('loginPage', (id) => {
    console.log("DENTRO DE LOGIN PAGE::    ");
    usuariosConectados.push({ socketId: socket, userId: id })
    usuariosConectados.forEach(u => {
      console.log("USER ID:: ", u.userId);
      console.log("USER SOCKET:: ", u.socketId.id);
    });
  })

  socket.on("logout", async(mail) =>{
    console.log(mail);
    var user = await getUserByMailALL(mail)
    console.log(user);
    usuariosConectados.forEach(u => {
      if (u.userId == user[0].user_id) {
        usuariosConectados.pop(u)
      }
      console.log("USER ID:: ", u.userId);
      console.log("USER SOCKET:: ", u.socketId.id);
    });
  })

  socket.on("disconnect", () => {
    usuariosConectados.forEach(u => {
      if (u.socketId == socket) {
        usuariosConectados.pop(u)
      }
      console.log("USER ID:: ", u.userId);
      console.log("USER SOCKET:: ", u.socketId.id);
    });
  });
});

const port = 3777;
server.listen(port, () => {
    console.log(`Server started on ${port}`);
});