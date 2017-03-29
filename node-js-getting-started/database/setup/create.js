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
        db.run("DROP TABLE IF EXISTS PAINTING");
        console.log("PAINTING deleted");
        db.run("DROP TABLE IF EXISTS MESSAGE");
        console.log("MESSAGE deleted");
        db.run("DROP TABLE IF EXISTS USER");
        console.log("USER deleted");
        db.run("DROP TABLE IF EXISTS MIX_TECH");
        console.log("MIX_TECH deleted");
        console.log("Creating TABLE PAINTING");
         db.run("CREATE TABLE PAINTING ("+
         "id TEXT,"+
         " alt TEXT,"+
         " path TEXT,"+
         "description TEXT,"+
         "thumb TEXT,"+
         "timestamp LONG"+
         ")");
         console.log("TABLE PAINTING created");
         console.log("Creating TABLE MIX_TECH");
         db.run("CREATE TABLE MIX_TECH ("+
         "id TEXT,"+
         "alt TEXT,"+
         "path TEXT,"+
         "description TEXT,"+
         "thumb TEXT,"+
         "timestamp LONG"+
         ")");
         console.log("TABLE MIX_TECH created");
         console.log("populating...");
         var stmt = db.prepare("INSERT INTO MIX_TECH VALUES (?,?,?,?,?,?)");
         for (var i = mix_tech.items.length-1; i >=0 ; i--) {
              var mix = mix_tech.items[i];
              console.log(mix.id,mix.alt,mix.path,mix.description,mix.thumb,Date.now()-200*i);
             stmt.run(mix.id,mix.alt,mix.path,mix.description,mix.thumb,Date.now()-200*i);
         }
         stmt.finalize();
         var stmt = db.prepare("INSERT INTO PAINTING VALUES (?,?,?,?,?,?)");
         for (var i = paintings.items.length-1; i >=0 ; i--) {
            var paint = paintings.items[i];
            console.log(paint.id,paint.alt,paint.path,paint.description,paint.thumb,Date.now()-200*i);

             stmt.run(paint.id,paint.alt,paint.path,paint.description,paint.thumb,Date.now()-200*i);
         }
         stmt.finalize();

      db.close();
    });
}

function erro(e) { if (e) throw e; }

var paintings = {
   items:[
  {id:"k0", alt:"La búsqueda", path:"k0.jpg", description:"Acrílico sobre papel Fabriàno \"Pittura\", 70x50cm, 2016", thumb:"c0.jpg"},
  {id:"k1", alt:"Ana", path:"k1.jpg", description:"Acrílico sobre tela, 70x 60 cm, 2015", thumb:"c1.jpg"},
  {id:"k2", alt:"Self portrait II", path:"k2.jpg", description:"Acrílico sobre tela, 40x 40 cm, 2013", thumb:"c2.jpg"},
  {id:"k3", alt:"Pili", path:"k3.jpg", description:"Esmalte sintético, 25x 33 cm, 2006", thumb:"c3.jpg"},
  {id:"k4", alt:"Xela y Berni", path:"k4.jpg", description:"Acrílico sobre tela, 120x 40 cm, 2014", thumb:"c4.jpg"},
  {id:"k5", alt:"Miguel", path:"k5.jpg", description:"Acrílico sobre tela, 65x 60 cm, 2014", thumb:"c5.jpg"},
  {id:"k6", alt:"Self portrait I", path:"k6.jpg", description:"Esmalte sintético, 60x 40 cm, 2006", thumb:"c6.jpg"},
  {id:"k7", alt:"Zu", path:"k7.jpg", description:"Acrílico sobre tela, 27x 43 cm, 2009", thumb:"c7.jpg"},
  {id:"k8", alt:"Miriam", path:"k8.jpg", description:"Acrílico sobre tela, 43x 27 cm, 2009", thumb:"c8.jpg"},
  {id:"k9", alt:"La cocina", path:"k9.jpg", description:"Acrílico y esmalte sintético, 21x 29 cm, 2007", thumb:"c9.jpg"},
  {id:"k10", alt:"Johnny", path:"k10.jpg", description:"Acrílico sobre tela, 55x 35 cm, 2008", thumb:"c10.jpg"},
  {id:"k11", alt:"La charla", path:"k11.jpg", description:"Acrílico sobre tela, 43x 58 cm, 2008", thumb:"c11.jpg"},
  {id:"k12", alt:"Rubén y María", path:"k12.jpg", description:"Acrílico sobre tela, 45x 25 cm, 2008", thumb:"c12.jpg"},
  {id:"k13", alt:"Mira en ti", path:"k13.jpg", description:"Acrílico sobre tela, 100x 100 cm, 2001", thumb:"c13.jpg"},
  {id:"k14", alt:"La siesta", path:"k14.jpg", description:"Acrílico sobre tela, 40x 35 cm, 2013 ", thumb:"c14.jpg"},
  {id:"k15", alt:"Sara", path:"k15.jpg", description:"Acrílico sobre tela, 50x 100 cm, 2005", thumb:"c15.jpg"},
  {id:"k16", alt:"El recreo", path:"k16.jpg", description:"Acrílico y esmalte sintético  sobre tabla, 160x 120 cm, 2006", thumb:"c16.jpg"},
  {id:"k17", alt:"Santiago", path:"k17.jpg", description:"Esmalte sintético sobre tabla, 70x 32 cm, 2005", thumb:"c17.jpg"},
  {id:"k18", alt:"Murgartegui", path:"k18.jpg", description:"Esmalte sintético sobre tabla, 100x 160 cm, 2006", thumb:"c18.jpg"},
  {id:"k19", alt:"Los cinco", path:"k19.jpg", description:"Acrílico y esmalte sintético sobre tabla, 160x 80 cm, 2006", thumb:"c19.jpg"},
  {id:"k20", alt:"La playa", path:"k23.jpg", description:"Esmalte sintético sobre tabla, 25x 33 cm, 2004", thumb:"c20.jpg"},
  {id:"k21", alt:"La playa II", path:"k21.jpg", description:"Esmalte sintético sobre tabla, 100x 50 cm, 2005", thumb:"c21.jpg"},
  {id:"k22", alt:"Encuentros", path:"k22.jpg", description:"dontknow", thumb:"c22.jpg"},
  {id:"k23", alt:"Santiago II", path:"k23.jpg", description:"Esmalte sintético sobre tabla, 33x 25 cm, 2004", thumb:"c23.jpg"},
  {id:"k24", alt:"A Rúa", path:"k24.jpg", description:"Esmalte sintético sobre tabla, 25x 33 cm, 2004", thumb:"c24.jpg"},
  {id:"k25", alt:"La estación", path:"k25.jpg", description:"Esmalte sintético sobre tabla, 25x 33 cm, 2004", thumb:"c25.jpg"},
  {id:"k26", alt:"Sarula", path:"k26.jpg", description:"Acrílico sobre tela, 45x 55 cm, 2008", thumb:"c26.jpg"},
  {id:"k27", alt:"Mari Carmen", path:"k27.jpg", description:"Papel pintado sobre tabla, 70x 55 cm, 2009", thumb:"c27.jpg"}
]
};

var mix_tech = {
 items:[
  {id:"t1",alt: "Tu pensamiento te hace libre", description:"Collage sobre A4, 2011",path:"t1.jpg",thumb:"p1.jpg"},
  {id:"t2",alt: "El hambre", description:"Collage sobre A4, 2011",path:"t2.jpg",thumb:"p2.jpg"},
  {id:"t3",alt: "La espera", description:"Collage sobre A4, 2011",path:"t3.jpg",thumb:"p3.jpg"},
  {id:"t4",alt: "Androide", description:"Collage sobre A4, 2011",path:"t4.jpg",thumb:"p4.jpg"},
  {id:"t6",alt:"Donna I" , description:"Collage sobre tabla, 30x 70 cm, 2011",path:"t5.jpg",thumb:"p5.jpg"},
  {id:"t5",alt: "El tiempo II", description:"Collage sobre tabla, 46x 61 cm, 2010",path:"t6.jpg",thumb:"p6.jpg"},
  {id:"t7",alt: "La despedida", description:"Collage sobre A4, 2011",path:"t7.jpg",thumb:"p7.jpg"},
  {id:"t8",alt: "El tiempo I", description:"Collage sobre papel, 20x 12 cm, 2008",path:"t8.jpg",thumb:"p8.jpg"},
  {id:"t9",alt: "Las tres Marías", description:"Collage sobre A4, 2007",path:"t9.jpg",thumb:"p9.jpg"},
  {id:"t10",alt: "Sin título", description:"Collage sobre A5, 2008",path:"t10.jpg",thumb:"p10.jpg"},
  {id:"t11",alt: "Mujer con pajaros", description:"Làpiz acuarelable, 46x 61 cm, 2015",path:"t11.jpg",thumb:"p11.jpg"},
  {id:"t12",alt: "Mujer-pez I", description:"pilot y acuarela, 46x 61 cm, 2008",path:"t12.jpg",thumb:"p12.jpg"},
  {id:"t13",alt: "Quédate callada", description:"Collage, 46x 61 cm, 2009",path:"t13.jpg",thumb:"p13.jpg"},
]
};
var gallery = {
   paintings: {
      items:paintings.items,
      folder:"painting"
   },
   mix_tech:{
      items: mix_tech.items,
      folder:"mix_tech"
   },
   islamic:{}
};
