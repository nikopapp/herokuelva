"use strict";
function buildInfoPage(URL){
  var content = readQuery(URL,fillPage);
}
function readQuery(URL,callback){
  console.log(URL);
  var query = URL.split("?")[1];
  var gallery ="";
  var pagetitle="";
  if (query.startsWith("k")) gallery="painting";
  else if(query.startsWith("t")) gallery="mix_tech";
  // try this < (&#8826;) it is a guay arrow.
  if (gallery === "painting") pagetitle = "<a href=\"painting.html\">&#9754; Paintings</a>";
  else pagetitle = "<a href=\"mix_tech.html\">&#9754; Mixed Teqniques</a>";
  var pInfo = "<br/><h3>&ldquo;"+alts[query]+"&rdquo;</h3>"+descriptions[query];
  var content =
    "<img id=\""+query+"\" src=\"images/gallery_pictures/"+gallery+"/"+query+".jpg\" alt=\""+alts[query]+"\"/>"+pInfo;
  fillPage(content, query, pagetitle, pInfo);
}
function fillPage(content,query, pagetitle){
  var imageDiv = document.getElementById('img').innerHTML = content;
  var title1 = document.getElementsByClassName('artwork')[0].innerHTML = pagetitle/*+alts[query]*/;
  addArrows(query);
}
function addArrows(query){
  var maxNum;
  if(query.startsWith("k")) maxNum = 27;
  else maxNum =13;
  var nextNum = (filterInt(query)+1)%maxNum;
  var prevNum = filterInt(query)-1;
  if (prevNum === 0) prevNum = maxNum;
  var next = document.getElementById('next').href="?"+query[0]+nextNum;
  var prev = document.getElementById('prev').href="?"+query[0]+prevNum;
}
function filterInt(query){
  var pageNum = parseInt(query.substring(1,query.length),10);
  return pageNum;
}
//------------------ descriptions
var descriptions = {
  "k1":"Acr&iacute;lico sobre tela, 70x60cm, 2015",
  "k2":"Acr&iacute;lico sobre tela, 40x40cm, 2013",
  "k3":"Esmalte sint&eacute;tico, 25x33cm, 2006",
  "k4":"Acr&iacute;lico sobre tela, 120x40cm, 2014",
  "k5":"Acr&iacute;lico sobre tela, 65x60cm, 2014",
  "k6":"Esmalte sint&eacute;tico, 60x40cm, 2006",
  "k7":"Acr&iacute;lico sobre tela, 27x43cm, 2009",
  "k8":"Acr&iacute;lico sobre tela, 43x27cm, 2009",
  "k9":"Acr&iacute;lico y esmalte sint&eacute;tico, 21x29cm, 2007",
  "k10":"Acr&iacute;lico sobre tela, 55x35cm, 2008",
  "k11":"Acr&iacute;lico sobre tela, 43x58cm, 2008",
  "k12":"Acr&iacute;lico sobre tela, 45x25cm, 2008",
  "k13":"Acr&iacute;lico sobre tela, 100x100cm, 2001",
  "k14":"Acr&iacute;lico sobre tela, 40x35cm, 2013 ",
  "k15":"Acr&iacute;lico sobre tela, 50x100cm, 2005",
  "k16":"Acr&iacute;lico y esmalte sint&eacute;tico  sobre tabla, 160x120cm, 2006",
  "k17":"Esmalte sint&eacute;tico sobre tabla, 70x32cm, 2005",
  "k18":"Esmalte sint&eacute;tico sobre tabla, 100x160cm, 2006",
  "k19":"Acr&iacute;lico y esmalte sint&eacute;tico sobre tabla, 160x80cm, 2006",
  "k20":"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004",
  "k21":"Esmalte sint&eacute;tico sobre tabla, 100x50cm, 2005",
  "k23":"Esmalte sint&eacute;tico sobre tabla, 33x25cm, 2004",
  "k23":"Esmalte sint&eacute;tico sobre tabla, 33x25cm, 2004",
  "k24":"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004",
  "k25":"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004",
  "k26":"Acr&iacute;lico sobre tela, 45x55cm, 2008",
  "k27":"Papel pintado sobre tabla, 70x55xm, 2009",
  "t1":"Collage sobre A4, 2011",
  "t2":"Collage sobre A4, 2011",
  "t3":"Collage sobre A4, 2011",
  "t4":"Collage sobre A4, 2011",
  "t5":"Collage sobre tabla, 46x61cm, 2010",
  "t6":"Collage sobre tabla, 30x70cm, 2011",
  "t7":"Collage sobre A4, 2011",
  "t8":"Collage sobre papel, 20x12cm, 2008",
  "t9":"Collage sobre A4, 2007",
  "t10":"Collage sobre A5, 2008",
  "t11":"L&aacute;piz acuarelable, 46x61cm, 2015",
  "t12":"pilot y acuarela, 46x61cm, 2008",
  "t13":"Collage, 46x61cm, 2009",

};
var alts = {
  "k1":"Ana",
  "k2":"Self portrait II",
  "k3":"Pili",
  "k4":"Xela y Berni",
  "k5":"Miguel",
  "k6":"Self portrait I",
  "k7":"Zu",
  "k8":"Miriam",
  "k9":"La cocina",
  "k10":"Johnny",
  "k11":"La charla",
  "k12":"Rub&eacute;n y Mar&iacute;a",
  "k13":"Mira en ti",
  "k14":"La Siesta",
  "k15":"Sara",
  "k16":"El recreo",
  "k17":"Santiago",
  "k18":"Murgartegui",
  "k19":"Los cinco",
  "k20":"La playa",
  "k21":"La playa II",
  "k22":"Encuentros",
  "k23":"Santiago II",
  "k24":"A R&uacute;a",
  "k25":"La estaci&oacute;n",
  "k26":"Sarula",
  "k27":"Mari Carmen",
  "t1":"Tu pensamiento te hace libre",
  "t2":"El hombre",
  "t3":"La espera",
  "t4":"Androide",
  "t5":"Donna I",
  "t6":"El tiempo II",
  "t7":"La despedida",
  "t8":"El tiempo I",
  "t9":"Las tres Mar&iacute;as",
  "t10":"Sin t&iacute;tulo",
  "t11":"Mujer con pajaros",
  "t12":"Mujer-pez I",
  "t13":"Quedate callada"
};

buildInfoPage(document.URL);
