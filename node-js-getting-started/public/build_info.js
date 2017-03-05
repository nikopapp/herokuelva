"use strict";
function buildInfoPage(URL){
   var fetchProps = {method:"GET"};
   var prom = fetch("/api/"+URL.split("?")[1], fetchProps);
   prom.then(function(res){
      console.log(res);
      return res;
   }).then(checkStatusOK)
   .then(parseJSON)
   .then(function(res){
      readQuery(res,URL);
   });
}

function checkStatusOK(response) {
    if (response.status === 200) {
        return response;
    } else {
        var err = new Error(response.statusText);
        err.response = response;
        throw err;
    }
}

function parseJSON(response) {
    return response.json();
}

function readQuery(res,URL){
   var img = document.getElementById("info");
   img.src = res.folder+res.item.path;
   img.alt = res.item.alt;
   img.id = res.item.id;
  // var imageDiv = document.getElementById('img');
  // imageDiv.appendChild(img);

  console.log(res);
  var gallery ="";
  var query = URL.split("?")[1];
  var pagetitle="";
  console.log(query);
  if (query.startsWith("pain")) gallery="painting";
  else if(query.startsWith("mix")) gallery="mix_tech";
  // try this < (&#8826;) it is a guay arrow.
  var anch = document.createElement("a");
  if (gallery === "painting") {
   anch.href="painting.html";
   anch.innerHTML="&#9754;Paintings";
  } else {
     anch.href="mix_tech.html";
     anch.innerHTML="&#9754; Mixed Techniques";
 }
  document.getElementsByClassName('artwork')[0].appendChild(anch);
  addArrows(res,URL);
  // var pInfo = "<br/><h3>&ldquo;"+alts[query]+"&rdquo;</h3>"+descriptions[query];
  // var content =
   //  "<img id=\""+query+"\" src=\"images/gallery_pictures/"+gallery+"/"+query+".jpg\" alt=\""+alts[query]+"\"/>"+pInfo;
  // fillPage(content, query, pagetitle, pInfo);
}
function addArrows(res,URL){
   var url = URL.split("?")[1].split("/")[0];
   document.getElementById('next').href="?"+url+"/"+res.nextImg;
   document.getElementById('prev').href="?"+url+"/"+res.prevImg;
}
function filterInt(query){
  var pageNum = parseInt(query.substring(1,query.length),10);
  return pageNum;
}
buildInfoPage(document.URL);
