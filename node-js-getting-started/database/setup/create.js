//this creates a database for use by server.js
"use strict";
var sql = require("sqlite3").verbose();
module.exports = {
  startup:startup
}
// var db = new sql.Database("../testCreate.sqlite3");
// db.serialize(startup);

function startup(db) {
    const mix_tech = gallery.mix_tech;
    const paintings = gallery.paintings;
    const err = erro;
    db.serialize(function(){

        db.run("DROP TABLE IF EXISTS WATERCOLOR");
        console.log("WATERCOLOR deleted");

        db.run("DROP TABLE IF EXISTS ISLAMIC");
        console.log("ISLAMIC deleted");

        db.run("DROP TABLE IF EXISTS PAINTING");
        console.log("PAINTING deleted");
        db.run("DROP TABLE IF EXISTS MIX_TECH");
        console.log("MIX_TECH deleted");

        console.log("Creating TABLE PAINTING");
         db.run("CREATE TABLE PAINTING ("+
         "id TEXT,"+
         "alt TEXT,"+
         "path TEXT,"+
         "descriptionESP TEXT,"+
         "descriptionENG TEXT,"+
         "thumb TEXT,"+
         "timestamp LONG"+
         ")");
         console.log("TABLE PAINTING created");
         console.log("Creating TABLE MIX_TECH");
         db.run("CREATE TABLE MIX_TECH ("+
         "id TEXT,"+
         "alt TEXT,"+
         "path TEXT,"+
         "descriptionESP TEXT,"+
         "descriptionENG TEXT,"+
         "thumb TEXT,"+
         "timestamp LONG"+
         ")");
         console.log("TABLE MIX_TECH created");
         console.log("Creating TABLE WATERCOLOR");
         db.run("CREATE TABLE WATERCOLOR ("+
         "id TEXT,"+
         "alt TEXT,"+
         "path TEXT,"+
         "descriptionESP TEXT,"+
         "descriptionENG TEXT,"+
         "thumb TEXT,"+
         "timestamp LONG"+
         ")");
         console.log("TABLE WATERCOLOR created");

// =====================================================================
         console.log("populating...");
         var stmt = db.prepare("INSERT INTO MIX_TECH VALUES (?,?,?,?,?,?,?)");
         for (var i = mix_tech.items.length-1; i >=0 ; i--) {
              var mix = mix_tech.items[i];
              console.log(mix.id,mix.alt,mix.path,mix.descriptionESP,mix.descriptionENG,mix.thumb,Date.now()-200*i);
             stmt.run(mix.id,mix.alt,mix.path,mix.descriptionESP,mix.descriptionENG,mix.thumb,Date.now()-200*i);
         }
         stmt.finalize();
         var stmt = db.prepare("INSERT INTO PAINTING VALUES (?,?,?,?,?,?,?)");
         for (var i = paintings.items.length-1; i >=0 ; i--) {
            var paint = paintings.items[i];
            console.log(paint.id,paint.alt,paint.path,paint.descriptionESP,paint.descriptionENG,paint.thumb,Date.now()-200*i);

             stmt.run(paint.id,paint.alt,paint.path,paint.descriptionESP,paint.descriptionENG,paint.thumb,Date.now()-200*i);
         }
         stmt.finalize();
         var stmt = db.prepare("INSERT INTO WATERCOLOR VALUES (?,?,?,?,?,?,?)");
         for (var i = watercolor.items.length-1; i >=0 ; i--) {
            var water = watercolor.items[i];
            console.log(water.id,water.alt,water.path,water.descriptionESP,water.descriptionENG,water.thumb,Date.now()-200*i);

             stmt.run(water.id,water.alt,water.path,water.descriptionESP,water.descriptionENG,water.thumb,Date.now()-200*i);
         }
         stmt.finalize();

      db.close();
    });
}

function erro(e) { if (e) throw e; }
var paintings = {
   items:[
  {id:"k1",   alt:"Ana",              path:"k1.jpg",    descriptionESP:"Acrílico sobre tela, 70x 60 cm, 2015",                     descriptionENG:"Acrylic on canvas, 70x 60 cm, 2015", thumb:"c1.jpg"},
  {id:"k2",   alt:"Autorretrato II", path:"k2.jpg",    descriptionESP:"Acrílico sobre tela, 40x 40 cm, 2013",                     descriptionENG:"Acrylic on canvas, 40x 40 cm, 2013", thumb:"c2.jpg"},
  {id:"k3",   alt:"Pili",             path:"k3.jpg",    descriptionESP:"Esmalte sintético sobre tabla, 25x 33 cm, 2006",           descriptionENG:"Synthetic enamel on woodboard, 25x 33 cm, 2006", thumb:"c3.jpg"},
  {id:"k4",   alt:"Xela y Berni",     path:"k4.jpg",    descriptionESP:"Acrílico sobre tela, 120x 40 cm, 2014",                    descriptionENG:"Acrylic on canvas, 120x 40 cm, 2014", thumb:"c4.jpg"},
  {id:"k6",   alt:"Autorretrato I",  path:"k6.jpg",    descriptionESP:"Esmalte sintético sobre tabla, 60x 40 cm, 2006",            descriptionENG:"Synthetic enamel on woodboard, 60x 40 cm, 2006", thumb:"c6.jpg"},
  {id:"k7",   alt:"Zu",               path:"k7.jpg",    descriptionESP:"Acrílico sobre tela, 27x 43 cm, 2009",                     descriptionENG:"Acrylic on canvas, 27x 43 cm, 2009", thumb:"c7.jpg"},
  {id:"k9",   alt:"La cocina",        path:"k9.jpg",    descriptionESP:"Acrílico y esmalte sintético sobre lienzo, 21x 29 cm, 2007",            descriptionENG:"Acrylic and synthetic enamel on canvas, 21x 29 cm, 2007",thumb:"c9.jpg"},
  {id:"k10",  alt:"Johnny",           path:"k10.jpg",   descriptionESP:"Acrílico sobre tela, 55x 35 cm, 2008",                     descriptionENG:"Acrylic on canvas, 55x 35 cm, 2008", thumb:"c10.jpg"},
  {id:"k11",  alt:"La charla",        path:"k11.jpg",   descriptionESP:"Acrílico sobre tela, 43x 58 cm, 2008",                     descriptionENG:"Acrylic on canvas, 43x 58 cm, 2008", thumb:"c11.jpg"},
  {id:"k12",  alt:"Rubén y María",    path:"k12.jpg",   descriptionESP:"Acrílico sobre tela, 45x 25 cm, 2008",                     descriptionENG:"Acrylic on canvas, 45x 25 cm, 2008", thumb:"c12.jpg"},
  {id:"k14",  alt:"La siesta",        path:"k14.jpg",   descriptionESP:"Acrílico sobre tela, 40x 35 cm, 2013 ",                    descriptionENG:"Acrylic on canvas, 40x 35 cm, 2013 ", thumb:"c14.jpg"},
  {id:"k16",  alt:"El recreo",        path:"k16.jpg",   descriptionESP:"Acrílico y esmalte sintético sobre tabla, 160x 120 cm, 2006",descriptionENG:"Acrylic and synthetic enamel on woodboard, 160x 120 cm, 2006", thumb:"c16.jpg"},
  {id:"k17",  alt:"Santiago",         path:"k17.jpg",   descriptionESP:"Esmalte sintético sobre tabla, 70x 32 cm, 2005",          descriptionENG:"Synthetic enamel on woodboard, 70x 32 cm, 2005", thumb:"c17.jpg"},
  {id:"k18",  alt:"Murgartegui",      path:"k18.jpg",   descriptionESP:"Esmalte sintético sobre tabla, 100x 160 cm, 2006",        descriptionENG:"Synthetic enamel on woodboard, 100x 160 cm, 2006", thumb:"c18.jpg"},
  {id:"k19",  alt:"Los cinco",        path:"k19.jpg",   descriptionESP:"Acrílico y esmalte sintético sobre tabla, 160x 80 cm, 2006",descriptionENG:"Acrylic and synthetic enamel on woodboard, 160x 80 cm, 2006", thumb:"c19.jpg"},
  {id:"k20",  alt:"La playa",         path:"k20.jpg",   descriptionESP:"Esmalte sintético sobre tabla, 25x 33 cm, 2004",          descriptionENG:"Synthetic enamel on woodboard, 25x 33 cm, 2004", thumb:"c20.jpg"},
  {id:"k21",  alt:"La playa II",      path:"k21.jpg",   descriptionESP:"Esmalte sintético sobre tabla, 100x 50 cm, 2005",         descriptionENG:"Synthetic enamel on woodboard, 100x 50 cm, 2005", thumb:"c21.jpg"},
  {id:"k22",  alt:"Encuentros",       path:"k22.jpg",   descriptionESP:"Esmalte sintético sobre tabla , 25x 33 cm, 2004",         descriptionENG:"Synthetic enamel on woodboard, 25x 33 cm, 2004", thumb:"c22.jpg"},
  {id:"k23",  alt:"Santiago II",      path:"k23.jpg",   descriptionESP:"Esmalte sintético sobre tabla, 33x 25 cm, 2004",          descriptionENG:"Synthetic enamel on woodboard, 33x 25 cm, 2004", thumb:"c23.jpg"},
  {id:"k24",  alt:"A Rúa",            path:"k24.jpg",   descriptionESP:"Esmalte sintético sobre tabla, 25x 33 cm, 2004",          descriptionENG:"Synthetic enamel on woodboard, 25x 33 cm, 2004", thumb:"c24.jpg"},
  {id:"k25",  alt:"La estación",      path:"k25.jpg",   descriptionESP:"Esmalte sintético sobre tabla, 25x 33 cm, 2004",          descriptionENG:"Synthetic enamel on woodboard, 25x 33 cm, 2004", thumb:"c25.jpg"},
  {id:"k26",  alt:"Sarula",           path:"k26.jpg",   descriptionESP:"Acrílico sobre tela, 45x 55 cm, 2008",                    descriptionENG:"Acrylic on canvas, 45x 55 cm, 2008", thumb:"c26.jpg"},
  {id:"k27",   alt:"La familia",      path:"Family.jpg",    descriptionESP:"Acrílico sobre tela, 61x 91 cm, 2017", descriptionENG:"Acrylic on canvas, 61x 91 cm, 2017", thumb:"TODO"},
  {id:"k28",   alt:"Sara",      path:"sara.jpg",    descriptionESP:"Acrílico sobre tela, 61x 91 cm, 2017", descriptionENG:"Acrylic on canvas, 61x 91 cm, 2017", thumb:"TODO"},
  {id:"k29",   alt:"Angeliki",      path:"angeliki.jpg",    descriptionESP:"Acrílico sobre tela, 61x 91 cm, 2017", descriptionENG:"Acrylic on canvas, 61x 91 cm, 2017", thumb:"TODO"},
]
};

var mix_tech = {
 items:[
  {id:"t1",alt: "Tu pensamiento te hace libre", descriptionESP:"Collage sobre A4, 2011", descriptionENG:"Collage on A4, 2011",path:"t1.jpg",thumb:"p1.jpg"},
  {id:"t2",alt: "El hambre", descriptionESP:"Collage sobre A4, 2011", descriptionENG:"Collage on A4, 2011",path:"t2.jpg",thumb:"p2.jpg"},
  {id:"t3",alt: "La espera", descriptionESP:"Collage sobre A4, 2011", descriptionENG:"Collage on A4, 2011",path:"t3.jpg",thumb:"p3.jpg"},
  {id:"t4",alt: "Androide", descriptionESP:"Collage sobre A4, 2011", descriptionENG:"Collage on A4, 2011",path:"t4.jpg",thumb:"p4.jpg"},
  {id:"t6",alt:"Donna I" , descriptionESP:"Collage sobre tabla, 30x 70 cm, 2011",descriptionENG:"Collage on woodboard, 30x 70 cm, 2011",path:"t5.jpg",thumb:"p5.jpg"},
  {id:"t5",alt: "El tiempo II", descriptionESP:"Collage sobre tabla, 46x 61 cm, 2010", descriptionENG:"Collage on woodboard, 46x 61 cm, 2010",path:"t6.jpg",thumb:"p6.jpg"},
  {id:"k13",  alt:"Mira en ti",       path:"k13.jpg",   descriptionESP:"Acrílico sobre tela, 100x 100 cm, 2001",                   descriptionENG:"Acrylic on canvas, 100x 100 cm, 2001", thumb:"c13.jpg"},
  {id:"t9",alt: "Las tres Marías", descriptionESP:"Collage sobre A4, 2007",descriptionENG:"Collage on A4, 2007",path:"t9.jpg",thumb:"p9.jpg"},
  {id:"t14",alt: "Yoli", descriptionESP:"Collage, 46x 61 cm, 2009",descriptionENG:"Collage, 46x 61 cm, 2009",path:"yoli.jpg",thumb:"TODO"},
]
};
var watercolor = {
  items:[
    {id:"w3",alt: "Akaki", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017", descriptionENG:"Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"Akachi.jpg",thumb:"zThumbAkachi.jpg"},
    {id:"w2",alt: "Amanitas", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017", descriptionENG:"Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"amanitas.jpg",thumb:"ZThumbamanitas.jpg"},
    {id:"w4",alt: "Gea", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, 21x 27 cm, 2017", descriptionENG:"Watercolour on 21x 27 cm Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"bluewind.jpg",thumb:"zThumbbluewind.jpg"},
    {id:"w1",alt: "Colourfields", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", descriptionENG:"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"splash.jpg",thumb:"zThumbsplash.jpg"},
    {id:"w5",alt: "Can't breath", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", descriptionENG:"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"cantbreath.jpg",thumb:"TODO"},
    {id:"w9",alt: "Dreams can come true", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", descriptionENG:"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"Dreamscancometrue.jpg",thumb:"TODO"},
    {id:"w8",alt: "Let me go", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", descriptionENG:"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"Letmego.jpg",thumb:"TODO"},
    {id:"w6",alt: "Purple hue", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", descriptionENG:"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"purplehue.jpg",thumb:"TODO"},
    {id:"w7",alt: "Willing", descriptionESP:"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", descriptionENG:"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017",path:"willing.jpg",thumb:"TODO"},
  ]
}

var gallery = {
   paintings: {
      items:paintings.items,
      folder:"painting"
   },
   mix_tech:{
      items: mix_tech.items,
      folder:"mix_tech"
   },
   watercolor:{
     items: watercolor.items,
     folder:"watercolor"
   }
};
