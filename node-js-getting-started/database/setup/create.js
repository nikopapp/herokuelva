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
         var stmt = db.prepare("INSERT INTO MIX_TECH VALUES (?,?,?,?,?,?,?,?,?)");
         for (let i = mix_tech.items.length-1; i >=0 ; i--) {
              const item = mix_tech.items[i];
              console.log(item.id,item.alt,item.className,item.path,item.descriptionESP,item.descriptionENG,item.date, item.thumb,Date.now()-200*i);
             stmt.run(item.id,item.alt,item.className,item.path,item.descriptionESP,item.descriptionENG,item.date, item.thumb,Date.now()-200*i);
         }
         stmt.finalize();
         var stmt = db.prepare("INSERT INTO PAINTING VALUES (?,?,?,?,?,?,?,?,?)");
         for (let i = paintings.items.length-1; i >=0 ; i--) {
            const item = paintings.items[i];
            console.log(item.id,item.alt,item.className,item.path,item.descriptionESP,item.descriptionENG,item.date, item.thumb,Date.now()-200*i);

             stmt.run(item.id,item.alt,item.className,item.path,item.descriptionESP,item.descriptionENG,item.date, item.thumb,Date.now()-200*i);
         }
         stmt.finalize();
         var stmt = db.prepare("INSERT INTO WATERCOLOR VALUES (?,?,?,?,?,?,?,?,?)");
         for (let i = watercolor.items.length-1; i >=0 ; i--) {
            const item = watercolor.items[i];
            console.log(item.id,item.alt,item.className,item.path,item.descriptionESP,item.descriptionENG,item.date,item.thumb,Date.now()-200*i);

             stmt.run(item.id,item.alt,item.className,item.path,item.descriptionESP,item.descriptionENG,item.date, item.thumb,Date.now()-200*i);
         }
         stmt.finalize();

      db.close();
    });
}

function erro(e) { if (e) throw e; }
var paintings = {
   items:[
        new Item("21",   "Angeliki",      "" ,"angeliki.jpg",    "Acrílico sobre tela, 61x 91 cm, 2017", "Acrylic on canvas, 61x 91 cm"," 2018", "TODO"),
        new Item("20",   "Sara",      "" ,"sara.jpg",    "Acrílico sobre tela, 61x 91 cm, 2017", "Acrylic on canvas, 61x 91 cm"," 2018", "TODO"),
        new Item("19",   "La familia",      "" ,"Family.jpg",    "Acrílico sobre tela, 61x 91 cm, 2017", "Acrylic on canvas, 61x 91 cm"," 2018", "TODO"),
        new Item("18",  "Los cinco",        "" ,"los cinco.jpg",   "Acrílico y esmalte sintético sobre tabla, 160x 80 cm, 2006","Acrylic and synthetic enamel on woodboard, 160x 80 cm"," 2006", "c19.jpg"),
        new Item("17",   "Xela y Berni",     "" ,"xela.jpg",    "Acrílico sobre tela, 120x 40 cm, 2014",                    "Acrylic on canvas, 120x 40 cm"," 2014", "c4.jpg"),
        new Item("16",  "El recreo",        "" ,"recreo.jpg",   "Acrílico y esmalte sintético sobre tabla, 160x 120 cm, 2006","Acrylic and synthetic enamel on woodboard, 160x 120 cm"," 2006", "c16.jpg"),
        new Item("15",  "Santiago",         "" ,"k17.jpg",   "Esmalte sintético sobre tabla, 70x 32 cm, 2005",          "Synthetic enamel on woodboard, 70x 32 cm"," 2005", "c17.jpg"),
        new Item("14",  "Murgartegui",      "" ,"mugartegui.jpg",   "Esmalte sintético sobre tabla, 100x 160 cm, 2006",        "Synthetic enamel on woodboard, 100x 160 cm"," 2006", "c18.jpg"),
        new Item("13",  "La charla",        "" ,"the-chat.jpg",   "Acrílico sobre tela, 43x 58 cm, 2008",                     "Acrylic on canvas, 43x 58 cm"," 2008", "c11.jpg"),
        new Item("12",   "Autorretrato",  "margin-mid" ,"selfportrait.jpg",    "Esmalte sintético sobre tabla, 60x 40 cm, 2006",            "Synthetic enamel on woodboard, 60x 40 cm"," 2006", "c6.jpg"),
        new Item("11", "Pilar",           "",     "pili.jpg", "Esmalte sintético sobre tabla, 25x 33 cm, 2006", "Synthetic enamel on woodboard, 25x 33 cm"," 2006", "c3.jpg"),
        new Item("10",  "La estación",      "" ,"k25.jpg",   "Esmalte sintético sobre tabla, 25x 33 cm, 2004",          "Synthetic enamel on woodboard, 25x 33 cm"," 2004", "c25.jpg"),
        new Item("9",  "Encuentros",       "" ,"k22.jpg",   "Esmalte sintético sobre tabla , 25x 33 cm, 2004",         "Synthetic enamel on woodboard, 25x 33 cm"," 2004", "c22.jpg"),
        new Item("8",  "A Rúa",            "" ,"rua.jpg",   "Esmalte sintético sobre tabla, 25x 33 cm, 2004",          "Synthetic enamel on woodboard, 25x 33 cm"," 2004", "c24.jpg"),
        new Item("7",  "La playa",         "" ,"k20.jpg",   "Esmalte sintético sobre tabla, 25x 33 cm, 2004",          "Synthetic enamel on woodboard, 25x 33 cm"," 2004", "c20.jpg"),
        new Item("6",  "La playa II",      "" ,"k21.jpg",   "Esmalte sintético sobre tabla, 100x 50 cm, 2005",         "Synthetic enamel on woodboard, 100x 50 cm"," 2004", "c21.jpg"),
        new Item("1",   "Zu",               "" ,"zu.jpg",    "Acrílico sobre tela, 27x 43 cm, 2009",                     "Acrylic on canvas, 27x 43 cm"," 2009", "c7.jpg"),
    ]
};

var mix_tech = {
 items:[
    new Item("8", "Yoli", "","yoli.jpg","Collage, 46x 61 cm, 2009","Collage, 46x 61 cm"," 2018", "TODO"),
    new Item("7",  "Mira en ti","","k13.jpg","Acrílico sobre tela, 100x 100 cm, 2001", "Acrylic on canvas, 100x 100 cm"," 2004", "c13.jpg"),
    new Item("6", "El tiempo II", "","time.jpg","Collage sobre tabla, 46x 61 cm, 2010", "Collage on woodboard, 46x 61 cm"," 2010","p6.jpg"),
    new Item("5","Donna I" , "margin-mid","Donna I.jpg","Collage sobre tabla, 30x 70 cm, 2011","Collage on woodboard, 30x 70 cm"," 2010","p5.jpg"),
    new Item("4", "Las tres Marías", "","p9.jpg","Collage sobre A4, 2007","Collage on A4"," 2007","p9.jpg"),
    new Item("3", "Tu pensamiento te hace libre", "","tu pensamiento te hace libre.jpg","Collage sobre A4, 2011", "Collage on A4"," 2011","p1.jpg"),
    new Item("2", "El hambre", "","el hambre.jpg","Collage sobre A4, 2011", "Collage on A4"," 2011","p2.jpg"),
    new Item("1", "La espera", "","la espera.jpg","Collage sobre A4, 2011", "Collage on A4"," 2011","p3.jpg"),
  ]
};


var watercolor = {
  items:[
    new Item("9", "Dreams can come true", "","Dreamscancometrue.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb"," 2018","TODO"),
    new Item("8", "Let me go", "","Letmego.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb"," 2018","TODO"),
    new Item("7", "Willing", "","willing.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb"," 2018","TODO"),
    new Item("6", "Purple hue", "","purplehue.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb"," 2018","TODO"),
    new Item("5", "Can't breath", "margin-mid","cantbreath.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb"," 2018","TODO"),
    new Item("4", "Gea", "","bluewind.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, 21x 27 cm, 2017", "Watercolour on 21x 27 cm Winsor & Newton watercolour paper 300gsm/140lb"," 2017","zThumbbluewind.jpg"),
    new Item("3", "Akaki", "", "Akachi.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017", "Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb"," 2017","zThumbAkachi.jpg"),
    new Item("2", "Amanitas", "margin-mid","amanitas.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017", "Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb"," 2017","ZThumbamanitas.jpg"),
    new Item("1", "Colourfeelds", "","splash.jpg","Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017", "Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb"," 2017","zThumbsplash.jpg"),
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
             "date TEXT,"+
             "thumb TEXT,"+
             "timestamp LONG"+
             ")";
}
