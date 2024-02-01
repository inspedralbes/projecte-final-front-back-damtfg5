var mysql = require('mysql2');
const fs = require('fs');
const { rejects } = require('assert');
const { resolve } = require('path');
const { error, profile } = require('console');
const date = new Date();

module.exports = {
    getUsers,
    insertUser,
    getIdUser,
    getUserById
};


var dbConfig = {
    host: "dam.inspedralbes.cat",
    user: "a22jhepincre_danismjhe",
    password: "DanIsmJhe22",
    database: "a22jhepincre_TFG5"
};

function conectDB() {
    let con = mysql.createConnection(dbConfig)
    con.connect(function (err) {
        if (err) {
            console.log("No conexio");
        } else {
            console.log("Conectado");
        }
    })
    return con
}

function disconnectDB(con) {
    con.end(function (err) {
        if (err) {
            return console.log("error: " + err.message);
        }
    })
}

function getUsers() {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT * FROM User;`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
        disconnectDB(con);
    });
}

function getIdUser(mail, password) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "SELECT id FROM Usuarios WHERE mail='" + mail + "' and contraseña='" + password + "';";

        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        disconnectDB(con);
    });
}

function getUserById(user_id) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = `SELECT nombre FROM Usuarios WHERE id=${user_id};`
        con.query(sql, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
        disconnectDB(con);
    })
}

function insertUser(name, surname, mail, password, telefono, country, cod_country, gender) {
    return new Promise((resolve, reject) => {
        let con = conectDB();
        var sql = "INSERT INTO Usuarios  (nombre, apellido, mail, contraseña, telefono, pais, codigo_pais, sexo)VALUES ('" + name + "', '"+ surname+"','" + mail + "', '" + password + "', '"+ telefono +"', '"+ country+"', '"+ cod_country +"', '"+ gender +"');";
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        disconnectDB(con);
    });
}