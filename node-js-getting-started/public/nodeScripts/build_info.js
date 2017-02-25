"use strict";
var t = require("./test.js");
var fs = require("fs");

module.exports = {
  buildInfoPage:buildInfoPage,
  test:test
}

// this is the main funcyion in build_info.js and controls the other functions
function buildInfoPage(query){
   var file = "../info.html";
   var fileOut ="./infotemp.html"
   console.log(fs.workingDirectory());
   var index = fs.readFileSync(file, 'utf8');
   if(!index) throw err;
   index = index.replace(/k1/g,query);
   index = index.replace(/replaceThis/g,fillInfo(query, fs))
   fs.writeFileSync(fileOut,index);
   return "/client/infotemp.html";
}

// This function looks for the detail images
// that some of the big artwork have, saved in the same folder
// for example k7.jpg also corresponds to k7d.jpg and k7e.jpg
function fillInfo(query, fs){
  var index=['d','e'];
  var key = query;
  query="";
  var folder= "./client/"
  var subfolder = "images/gallery_pictures/painting/";
  for(var i = 0; i <= 1; i++){
    var img = key+index[i]+".jpg";
    console.log("looking for: "+folder+subfolder+img);
    if(fs.existsSync(folder+subfolder+img)){
      console.log("found: "+folder+img);
      query += addImage(subfolder,img);
    }
    else if(query.length<5) query =" ";
    else query +=" ";
  }
  return query;
}

// This function appends the string with a <div> <img>
function addImage(folder,img){
  var div = "<div class=\"img\""; // the escape character \" is used
  var str = div+"><img id=\"info1\" src=\"" + folder + img +"\"/></div>";
  return str;
}

function test(){
  t.check(addImage("/painting/","k2"),"<div class=\"img\"><img id=\"info1\" src=\"/painting/k2\"/></div>");
}
