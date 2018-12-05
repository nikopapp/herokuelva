"use strict";
var artwork = document.getElementsByClassName('dropdown-content');

function showClick(menuItem){
  var style = window.getComputedStyle(menuItem[0]);
  if(style.getPropertyValue("display")=="none"){
    menuItem[0].style.display = "block";
  } else{
    menuItem[0].style.display = "none";
  }
}
function clickEvent(event){
  if(event.target === document.getElementById("#m3")){
    // showClick(artwork);
  }else{
    artwork[0].style.display = "none";
  }

}
function transformFirma(){
  var imgInfo = document.getElementsByClassName("info-img-img")[0];
  var computedStyle = window.getComputedStyle(imgInfo);
}
function waitForLoad(){
  var body = document.getElementsByTagName('body');
  var url = document.URL;
  if(url.endsWith("contact.html")) putDrops();
  var bodyCont = body.innerHTML;
  return bodyCont;
}
function putDrops(){
  var itemName = 'ranDrop';
  var ranDrops = document.getElementsByClassName('ranDrops');
  var drops = [];
  for(var i = 0;i<10;i++){
    drops.push(document.createElement("img"));
    var raNum = 1+random()%45;
    drops[i].setAttribute("src", "images/animation/m"+raNum+".png");
    drops[i].setAttribute("id", itemName+i);
    drops[i].setAttribute("width", (40+(i%9)+"px"));
    drops[i].style.position="relative";
    drops[i].style.opacity="0.7";
    drops[i].style.top=(random()%100)+"%";
    drops[i].style.left=(random()%100)+"%";
    drops[i].style.zIndex="-1";
    ranDrops[0].appendChild(drops[i]);
  }

}
function headerHide(){
  // var url = document.URL;
  // if(!(url.indexOf("info.html") >0)) return;
  var header = document.getElementsByTagName('header');
  var top = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
  if(top>5){
    header[0].className = "header-scrolled";
  }else{
    header[0].className ="";
  }
}
function etsyNotReady(){
   var notreadydiv = document.getElementById("etsyNotReady");
   var visibility = window.getComputedStyle(notreadydiv).visibility;
   if(visibility=="visible")
      notreadydiv.style.visibility="hidden";
   else
      notreadydiv.style.visibility="visible";
}

function random(){
  return 1+Math.floor(100*Math.random());
}
var contents = waitForLoad();
window.onload = document.getElementsByTagName('body').innerHTML=contents;

window.addEventListener("scroll", headerHide);
