const { MongoClient, ObjectId } = require("mongodb");
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3777;
const fileUpload = require("express-fileupload")
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const { spawn } = require('child_process');


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

server.listen(port, () => {
    console.log(`Server started on ${port}`);
  });