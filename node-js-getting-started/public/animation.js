"use strict";
var divAnim = document.getElementById('animation');

var animate = function(callback) {
  var itemName = 'drop';
  var images = new Array();
  var anchors = new Array();

  images.push(document.getElementById('titleEAT'));
  for (var i=1; i<=43;i++){
    anchors.push(document.createElement("a"));
    images.push(document.createElement("img"));
    images[i].setAttribute("src", "images/animation/m"+i+".png");
    images[i].setAttribute("id", itemName+i);
    images[i].setAttribute("width", (40+(i%9)+"px"));
    anchors[i-1].appendChild(images[i]);
    divAnim.appendChild(anchors[i-1]);
  }
  var animDiv = document.getElementsByClassName('animation');
  var counter = 0;
  var counter2 = 10;
  var posY = 10;
  var posX = 35;

  //main title ("titleEAT")
  images[0].style.top = (posY+10) +"%";
  images[0].style.left = (posX+8) +"%";

  for (var i=1;i<15;i++){
    images[i].style.top = (posY+getRandomArbitrary(15,40)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(0,20)) +"%";
    // console.log(images[i].style.left);
    makePortalDrops(images[i], i);
  }

  for (var i=15;i<30;i++){
    images[i].style.top = (posY+getRandomArbitrary(5,60)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(-10,45)) +"%";
    // console.log(images[i].style.left);
    makePortalDrops(images[i], i);
  }

  for (var i=30;i<=43;i++){
    images[i].style.top = (posY+getRandomArbitrary(-5,80)) +"%";
    images[i].style.left = (posX+getRandomArbitrary(-30,75)) +"%";
    // console.log(images[i].style.left);
    makePortalDrops(images[i], i);
  }

// This fucntion had to be repetitive as the intervals
// were intended to look as if they were random.
  var id = setInterval(frame, 80);
  function frame() {
    if (images[0].style.opacity == 1) {
      clearInterval(id);
    } else if (counter== 0)   images[1].style.opacity = 0.8;
      else if (counter == 2)  images[2].style.opacity = 0.8;
      else if (counter == 3)  images[3].style.opacity = 0.8;
      else if (counter == 6)  images[4].style.opacity = 0.81;
      else if (counter == 8)  images[5].style.opacity = 0.81;
      else if (counter == 10) images[6].style.opacity = 0.6;
      else if (counter == 11) images[7].style.opacity = 0.6;
      else if (counter == 13) images[8].style.opacity = 0.6;
      else if (counter == 16) images[9].style.opacity = 0.61;
      else if (counter == 18) images[10].style.opacity = 0.61;
      else if (counter == 20) images[11].style.opacity = 0.6;
      else if (counter == 22) images[12].style.opacity = 0.6;
      else if (counter == 23) images[13].style.opacity = 0.6;
      else if (counter == 26) images[14].style.opacity = 0.61;
      else if (counter == 28) images[15].style.opacity = 0.61;
      else if (counter == 30) images[16].style.opacity = 0.6;
      else if (counter == 31) images[17].style.opacity = 0.8;
      else if (counter == 33) images[18].style.opacity = 0.8;
      else if (counter == 36) images[19].style.opacity = 0.81;
      else if (counter == 38) images[20].style.opacity = 0.81;
      else if (counter == 40) images[21].style.opacity = 0.6;
      else if (counter == 42) images[22].style.opacity = 0.6;
      else if (counter == 43) images[23].style.opacity = 0.6;
      else if (counter == 46) images[24].style.opacity = 0.61;
      else if (counter == 48) images[25].style.opacity = 0.61;
      else if (counter == 50) images[26].style.opacity = 0.6;
      else if (counter == 51) images[27].style.opacity = 0.8;
      else if (counter == 52) images[28].style.opacity = 0.8;
      else if (counter == 55) images[29].style.opacity = 0.81;
      else if (counter == 57) images[30].style.opacity = 0.81;
      else if (counter == 58) images[31].style.opacity = 0.81;
      else if (counter == 60) images[32].style.opacity = 0.6;
      else if (counter == 62) images[33].style.opacity = 0.6;
      else if (counter == 63) images[34].style.opacity = 0.6;
      else if (counter == 66) images[35].style.opacity = 0.61;
      else if (counter == 68) images[36].style.opacity = 0.61;
      else if (counter == 70) images[37].style.opacity = 0.6;
      else if (counter == 71) images[38].style.opacity = 0.8;
      else if (counter == 72) images[39].style.opacity = 0.8;
      else if (counter == 75) images[40].style.opacity = 0.81;
      else if (counter == 77) images[41].style.opacity = 0.81;
      else if (counter == 78) images[42].style.opacity = 0.81;
      else if (counter == 82) images[43].style.opacity = 0.6;
      counter++;
  }
}
function makePortals(drop,i){
    drop.onmouseenter = makeBlownDrop;
    drop.ontouchstart = makeBlownDrop;
    drop.onmouseleave = revertDrop;
    function makeBlownDrop(){
      drop.style.transition = "all 0.6s ease";
      drop.setAttribute("src","images/gallery_pictures/colourfields_series/c" +
          (1 + Math.floor((10000*Math.random())%27)) + ".jpg");
      drop.setAttribute("width","200px");
      drop.style.zIndex="30";
    };
    function revertDrop(){
      drop.style.zIndex="1";
      drop.setAttribute("width","50px");
      drop.setAttribute("src","images/animation/m"+i+".png");
    };
}
function makePortalDrops(drop,i){
    drop.onmouseenter = function(){
      var imageSwap = new Image();
      var randomNum = (1 + Math.floor((10000*Math.random())%22));
      console.log("1st"+randomNum);
      imageSwap.src = "images/gallery_pictures/colourfields_series/c"+ randomNum + ".jpg";
      // console.log(imageSwap[0]);
      drop.parentElement.href="#!/info/paintings/"+randomNum;
      drop.style.transition = "all 0.6s ease";
      drop.setAttribute("src","images/gallery_pictures/colourfields_series/c" +
          randomNum + ".jpg");
      drop.setAttribute("width","200px");
      drop.style.transform = "translate3d(-75px,-75px,0px)";
      // drop.setAttribute("height","100px");
      drop.style.zIndex="3";
      drop.style.opacity = ".85";
    };
    drop.onmouseleave = function(){
      // drop.style.pointerEvents="none";
      drop.style.zIndex="1";
      drop.setAttribute("width","50px");
      drop.style.transform = "translate3D(0px,0px,0px)";
      // drop.setAttribute("height","auto");
      drop.style.opacity="0.7";
      drop.setAttribute("src","images/animation/m"+i+".png");
    };
}

function putMask(){

  var imagecanvas = document.createElement('canvas');
  var imagecontext = imagecanvas.getContext('2d');

  /* uncomment do see the canvas to debug
  document.body.appendChild(imagecanvas);
  */
  window.addEventListener('load', function(){
    [].forEach.call(document.querySelectorAll('.mask'), function(img){
      var newImg = document.createElement('img');
      newImg.src = img.src;

      newImg.onload = function() {
        var width  = newImg.width;
        var height = newImg.height;

        var mask = document.createElement('img');
        mask.src = img.getAttribute('data-mask');
        mask.onload = function() {
          imagecanvas.width  = width;
          imagecanvas.height = height;

          imagecontext.drawImage(mask, 0, 0, width, height);
          imagecontext.globalCompositeOperation = 'source-atop';
          imagecontext.drawImage(img, 0, 0);

          img.src = imagecanvas.toDataURL();
        }
      }
    });
  }, false);

}

function makeInit(){
  if(window.location.href.includes("grid") ||
      window.location.href.includes("info")||
      window.location.href.includes("about")){
    return;
  }

  divAnim = document.getElementById("animation");
  if(divAnim){
    animate(makePortals);
  } else {
    setTimeout(makeInit, 2000);
  }
}
window.onload = makeInit;

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
