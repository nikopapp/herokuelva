// creates a test database if required
"use strict";
var sql = require("sqlite3");
sql.verbose();
var testDB = new sql.Connection("./test.sqlite3");
testDB.serialize(startup);

function startup() {
  testDB.run("CREATE TABLE IF NOT EXISTS Message(messageId INTEGER,"+
                           "name VARCHAR(100) NOT NULL,"+
                           "body TEXT ,"+
                           "tstamp INTEGER  ,"+
                           "email VARCHAR(100) NOT NULL,"+
                    "CONSTRAINT pkMssgid PRIMARY KEY(messageId))",
         err);
  testDB.run("CREATE TABLE IF NOT EXISTS " +
         "User (usId INTEGER," +
          "userName VARCHAR(100) NOT NULL UNIQUE, pass VARCHAR(100) NOT NULL, "+
          "CONSTRAINT pkUid PRIMARY KEY(usId))", err);
  testDB.run("INSERT INTO USER (userName, pass) VALUES ('Nikos', '2108')", err)
  testDB.run("INSERT INTO USER (userName, pass) VALUES ('admin', 'admin')", err)

  testDB.close();
}


function err(e) { if (e) throw e; }
