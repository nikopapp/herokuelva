// This piece of code is originated from:
// http://www.w3schools.com/css/tryit.asp?filename=trycss_image_gallery_responsive_js
// and has been subject to changes
var modal = document.getElementById('myModal');
var close = document.getElementById('close');
close.onclick = function() {
  var modCont = document.getElementsByClassName('modal-content')[0];
    modCont.style.animationName ="unzoom";
    modCont.style.animationPlayState = "running";
    setTimeout(modalClose,300);
}
function modalClose(){
  modal.style.display = "none";
}
var images = document.getElementsByTagName('img');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var next = document.getElementById('galleryNext');
var nextSrc = "";
var prev = document.getElementById('galleryPrev');
var currSrc = "";
var i;
for (i = 0; i < images.length; i++) {
   if(images[i].className!== 'nonmodal')
   images[i].onclick = function(){
       modal.style.display = "block";
       modalImg.src = this.src;
       currSrc = this.src;
       modalImg.alt = this.alt;
       var modCont = document.getElementsByClassName('modal-content')[0];
       modCont.style.animationName ="zoom";
       console.log("modal happened");
      //  captionText.innerHTML = this.nextElementSibling.innerHTML;
   }
}
function changePic(incrementation){
  var imgPath = currSrc.split("/");
  var imgPic = imgPath[imgPath.length-1].split(".")[0];
  var extension = imgPath[imgPath.length-1].split(".")[1];
  var totalPicNum;
  if(imgPic.startsWith("c")) totalPicNum = 13;
  else if(imgPic.startsWith("k")) totalPicNum = 28;
  var imgNum = (totalPicNum+parseInt(imgPic.substring(1,imgPic.length))+incrementation)%totalPicNum;
  var newSrc = imgPath[0]+"/";
  console.log("mod"+modalImg.src);
  for(var j=1;j<imgPath.length-1;j++){
    newSrc += imgPath[j]+"/";
  }
  newSrc +=  imgPic[0]+imgNum+"."+extension;
  currSrc = newSrc;
  document.getElementById('img01').src = newSrc;
  console.log(newSrc);
}
