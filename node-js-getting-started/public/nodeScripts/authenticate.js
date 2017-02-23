"use strict";
var t = require("./test.js");
var sql = require('sqlite3').verbose();
var testDB = new sql.Database("./nodeScripts/test.sqlite3"); // used for testing

module.exports = {
  verify:verify,
  test:test
}

function verify(un,p, db,callback){
  var ps = db.prepare("SELECT userName,pass from User where username=?");
  ps.get(un, getResultsUn.bind(null,un,p,callback)); // used so that database
  // resukts are run before anything is further processed
}
function getResultsUn(un,p,callback, err, row) {
  if(err) console.error(err);
  if(row){
    if(p===row.pass){ // tests whether the password is apparent at the row
      console.log("user match");
      // inclused for testing when nodejs starts
      callback();
    }else console.log("Wrong combination of username and password");
    // inclused for testing when nodejs starts
  }else console.log("No user found under this user name");
  // included for testing when nodejs starts
}

function test(){ // used for testing
  verify("Nikos","2108",testDB,returnValue);
  verify("Nikos","999",testDB,returnValue);
  function returnValue(){}
}
