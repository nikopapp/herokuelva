//this creates a database for use by server.js
"use strict";
var sql = require("sqlite3").verbose();
module.exports = {
  startup:startup
}
var db = new sql.Database("../database.sqlite3");
db.serialize(startup);

function startup() {
  db.run("CREATE TABLE IF NOT EXISTS Message(messageId INTEGER,"+
                           "name VARCHAR(100) NOT NULL,"+
                           "body TEXT ,"+
                           "tstamp INTEGER  ,"+
                           "email VARCHAR(100) NOT NULL,"+
                    "CONSTRAINT pkMssgid PRIMARY KEY(messageId))",
         err);
  db.run("CREATE TABLE IF NOT EXISTS " +
         "User (usId INTEGER," +
          "userName VARCHAR(100) NOT NULL UNIQUE, pass VARCHAR(100) NOT NULL, "+
          "CONSTRAINT pkUid PRIMARY KEY(usId))", err);
  db.close();
}

function err(e) { if (e) throw e; }
