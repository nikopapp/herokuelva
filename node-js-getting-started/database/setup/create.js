//this creates a database for use by server.js
"use strict";
var sql = require("sqlite3").verbose();
var Item = require("../../server/Item").Item;
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

        db.run("DROP TABLE IF EXISTS PAINTING");
        console.log("PAINTING deleted");
        db.run("DROP TABLE IF EXISTS MIX_TECH");
        console.log("MIX_TECH deleted");

        console.log("Creating TABLE PAINTING");
        db.run(createTableCreationQuery("PAINTING"));
        console.log("TABLE PAINTING created");

        console.log("Creating TABLE MIX_TECH");
        db.run(createTableCreationQuery("MIX_TECH"));
        console.log("TABLE MIX_TECH created");

        console.log("Creating TABLE WATERCOLOR");
        db.run(createTableCreationQuery("WATERCOLOR"));
        console.log("TABLE WATERCOLOR created");

// =====================================================================
         console.log("populating...");
         var stmt = db.prepare("INSERT INTO MIX_TECH VALUES (?,?,?,?,?,?,?,?)");
         for (var i = mix_tech.items.length-1; i >=0 ; i--) {
              var mix = mix_tech.items[i];
              console.log(mix.id,mix.alt,mix.className,mix.path,mix.descriptionESP,mix.descriptionENG,mix.thumb,Date.now()-200*i);
             stmt.run(mix.id,mix.alt,mix.className,mix.path,mix.descriptionESP,mix.descriptionENG,mix.thumb,Date.now()-200*i);
         }
         stmt.finalize();
         var stmt = db.prepare("INSERT INTO PAINTING VALUES (?,?,?,?,?,?,?,?)");
         for (var i = paintings.items.length-1; i >=0 ; i--) {
            var paint = paintings.items[i];
            console.log(paint.id,paint.alt,paint.className,paint.path,paint.descriptionESP,paint.descriptionENG,paint.thumb,Date.now()-200*i);

             stmt.run(paint.id,paint.alt,paint.className,paint.path,paint.descriptionESP,paint.descriptionENG,paint.thumb,Date.now()-200*i);
         }
         stmt.finalize();
         var stmt = db.prepare("INSERT INTO WATERCOLOR VALUES (?,?,?,?,?,?,?,?)");
         for (var i = watercolor.items.length-1; i >=0 ; i--) {
            var water = watercolor.items[i];
            console.log(water.id,water.alt,water.className,water.path,water.descriptionESP,water.descriptionENG,water.thumb,Date.now()-200*i);

             stmt.run(water.id,water.alt,water.className,water.path,water.descriptionESP,water.descriptionENG,water.thumb,Date.now()-200*i);
         }
         stmt.finalize();

      db.close();
    });
}

function erro(e) { if (e) throw e; }
var paintings = {
   items:[
        new Item("1", "Ana",            "cslcl", "k1.jpg","Acrílico sobre tela, 70x 60 cm, 2015","Acrylic on canvas, 70x 60 cm, 2015", "c1.jpg"),
        new Item("2", "Autorretrato II","",     "k2.jpg", "Acrílico sobre tela, 40x 40 cm, 2013", "Acrylic on canvas, 40x 40 cm, 2013", "c2.jpg"),
        new Item("3", "Pili",           "",     "k3.jpg", "Esmalte sintético sobre tabla, 25x 33 cm, 2006", "Synthetic enamel on woodboard, 25x 33 cm, 2006", "c3.jpg"),
        new Item("4",   "Xela y Berni",     "" ,"k4.jpg",    "Acrílico sobre tela, 120x 40 cm, 2014",                    "Acrylic on canvas, 120x 40 cm, 2014", "c4.jpg"),
        new Item("6",   "Autorretrato I",  "" ,"k6.jpg",    "Esmalte sintético sobre tabla, 60x 40 cm, 2006",            "Synthetic enamel on woodboard, 60x 40 cm, 2006", "c6.jpg"),
        new Item("7",   "Zu",               "" ,"k7.jpg",    "Acrílico sobre tela, 27x 43 cm, 2009",                     "Acrylic on canvas, 27x 43 cm, 2009", "c7.jpg"),
        new Item("9",   "La cocina",        "" ,"k9.jpg",    "Acrílico y esmalte sintético sobre lienzo, 21x 29 cm, 2007",            "Acrylic and synthetic enamel on canvas, 21x 29 cm, 2007","c9.jpg"),
        new Item("10",  "Johnny",           "" ,"k10.jpg",   "Acrílico sobre tela, 55x 35 cm, 2008",                     "Acrylic on canvas, 55x 35 cm, 2008", "c10.jpg"),
        new Item("11",  "La charla",        "" ,"k11.jpg",   "Acrílico sobre tela, 43x 58 cm, 2008",                     "Acrylic on canvas, 43x 58 cm, 2008", "c11.jpg"),
        new Item("12",  "Rubén y María",    "" ,"k12.jpg",   "Acrílico sobre tela, 45x 25 cm, 2008",                     "Acrylic on canvas, 45x 25 cm, 2008", "c12.jpg"),
        new Item("14",  "La siesta",        "" ,"k14.jpg",   "Acrílico sobre tela, 40x 35 cm, 2013 ",                    "Acrylic on canvas, 40x 35 cm, 2013 ", "c14.jpg"),
        new Item("16",  "El recreo",        "" ,"k16.jpg",   "Acrílico y esmalte sintético sobre tabla, 160x 120 cm, 2006","Acrylic and synthetic enamel on woodboard, 160x 120 cm, 2006", "c16.jpg"),
        new Item("17",  "Santiago",         "" ,"k17.jpg",   "Esmalte sintético sobre tabla, 70x 32 cm, 2005",          "Synthetic enamel on woodboard, 70x 32 cm, 2005", "c17.jpg"),
        new Item("18",  "Murgartegui",      "" ,"k18.jpg",   "Esmalte sintético sobre tabla, 100x 160 cm, 2006",        "Synthetic enamel on woodboard, 100x 160 cm, 2006", "c18.jpg"),
        new Item("19",  "Los cinco",        "" ,"k19.jpg",   "Acrílico y esmalte sintético sobre tabla, 160x 80 cm, 2006","Acrylic and synthetic enamel on woodboard, 160x 80 cm, 2006", "c19.jpg"),
        new Item("20",  "La playa",         "" ,"k20.jpg",   "Esmalte sintético sobre tabla, 25x 33 cm, 2004",          "Synthetic enamel on woodboard, 25x 33 cm, 2004", "c20.jpg"),
        new Item("21",  "La playa II",      "" ,"k21.jpg",   "Esmalte sintético sobre tabla, 100x 50 cm, 2005",         "Synthetic enamel on woodboard, 100x 50 cm, 2005", "c21.jpg"),
        new Item("22",  "Encuentros",       "" ,"k22.jpg",   "Esmalte sintético sobre tabla , 25x 33 cm, 2004",         "Synthetic enamel on woodboard, 25x 33 cm, 2004", "c22.jpg"),
        new Item("23",  "Santiago II",      "" ,"k23.jpg",   "Esmalte sintético sobre tabla, 33x 25 cm, 2004",          "Synthetic enamel on woodboard, 33x 25 cm, 2004", "c23.jpg"),
        new Item("24",  "A Rúa",            "" ,"k24.jpg",   "Esmalte sintético sobre tabla, 25x 33 cm, 2004",          "Synthetic enamel on woodboard, 25x 33 cm, 2004", "c24.jpg"),
        new Item("25",  "La estación",      "" ,"k25.jpg",   "Esmalte sintético sobre tabla, 25x 33 cm, 2004",          "Synthetic enamel on woodboard, 25x 33 cm, 2004", "c25.jpg"),
        new Item("26",  "Sarula",           "" ,"k26.jpg",   "Acrílico sobre tela, 45x 55 cm, 2008",                    "Acrylic on canvas, 45x 55 cm, 2008", "c26.jpg"),
        new Item("27",   "La familia",      "" ,"Family.jpg",    "Acrílico sobre tela, 61x 91 cm, 2017", "Acrylic on canvas, 61x 91 cm, 2017", "TODO"),
        new Item("28",   "Sara",      "" ,"sara.jpg",    "Acrílico sobre tela, 61x 91 cm, 2017", "Acrylic on canvas, 61x 91 cm, 2017", "TODO"),
        new Item("29",   "Angeliki",      "" ,"angeliki.jpg",    "Acrílico sobre tela, 61x 91 cm, 2017", "Acrylic on canvas, 61x 91 cm, 2017", "TODO"),
    ]
};

var mix_tech = {
 items:[
    new Item("1", "Tu pensamiento te hace libre", "","t1.jpg","Collage sobre A4, 2011", "Collage on A4, 2011","p1.jpg"),
    new Item("2", "El hambre", "","t2.jpg","Collage sobre A4, 2011", "Collage on A4, 2011","p2.jpg"),
    new Item("3", "La espera", "","t3.jpg","Collage sobre A4, 2011", "Collage on A4, 2011","p3.jpg"),
    new Item("4", "Androide", "","t4.jpg","Collage sobre A4, 2011", "Collage on A4, 2011","p4.jpg"),
    new Item("6","Donna I" , "","t6.jpg","Collage sobre tabla, 30x 70 cm, 2011","Collage on woodboard, 30x 70 cm, 2011","p5.jpg"),
    new Item("5", "El tiempo II", "","t5.jpg","Collage sobre tabla, 46x 61 cm, 2010", "Collage on woodboard, 46x 61 cm, 2010","p6.jpg"),
    new Item("13",  "Mira en ti","","k13.jpg","Acrílico sobre tela, 100x 100 cm, 2001", "Acrylic on canvas, 100x 100 cm, 2001", "c13.jpg"),
    new Item("9", "Las tres Marías", "","p9.jpg","Collage sobre A4, 2007","Collage on A4, 2007","p9.jpg"),
    new Item("14", "Yoli", "","yoli.jpg","Collage, 46x 61 cm, 2009","Collage, 46x 61 cm, 2009", "TODO"),
  ]
};
var watercolor = {
  items:[
    new Item("3", "Akaki", "", "Akachi.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017", "Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb, 2017","zThumbAkachi.jpg"),
    new Item("2", "Amanitas", "","amanitas.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017", "Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb, 2017","ZThumbamanitas.jpg"),
    new Item("4", "Gea", "","bluewind.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, 21x 27 cm, 2017", "Watercolour on 21x 27 cm Winsor & Newton watercolour paper 300gsm/140lb, 2017","zThumbbluewind.jpg"),
    new Item("1", "Colourfields", "","splash.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017","zThumbsplash.jpg"),
    new Item("5", "Can't breath", "","cantbreath.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017","TODO"),
    new Item("9", "Dreams can come true", "","Dreamscancometrue.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017","TODO"),
    new Item("8", "Let me go", "","Letmego.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017","TODO"),
    new Item("6", "Purple hue", "","purplehue.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017","TODO"),
    new Item("7", "Willing", "","willing.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb, 2017","TODO"),
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
function createTableCreationQuery(name){
    return "CREATE TABLE "+name+" ("+
             "id LONG,"+
             "alt TEXT,"+
             "className TEXT," +
             "path TEXT,"+
             "descriptionESP TEXT,"+
             "descriptionENG TEXT,"+
             "thumb TEXT,"+
             "timestamp LONG"+
             ")";
}
