var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
var fileUpload = require("express-fileupload");
var fs = require("fs");
// var mailin = require("mailin");
var statusCode = {"notFound": 404, "ok": 200, "created": 201};

var sql = require("sqlite3").verbose();
var db = new sql.Database("database/db.sqlite3");

// var infoBuild = require("../public/nodeScripts/build_info");
// var mid = function(req,res,callback){
//    if(req.url === "/info.html?k1")  {
//       console.log(req.url.toString()+"\n"+res);
//       infoBuild.buildInfoPage(req.url, "k1");
//    }
//    callback();
// };

module.exports = function(port, middleware, callback) {

   // mailin.start({
   //    port:20,
   //    disableWebHook:true
   // });
   //------------------ descriptions
   var paintings = {
      items:[
    //  {id:"k0", alt:"The Search", path:"k0.jpg", description:"Acr&iacute;lico sobre papel Fabri&aacute;no \"Pittura\", 70x50cm, 2016", thumb:"c0.jpg"},
    //  {id:"k1", alt:"Ana", path:"k1.jpg", description:"Acr&iacute;lico sobre tela, 70x60cm, 2015", thumb:"c1.jpg"},
    //  {id:"k2", alt:"Self portrait II", path:"k2.jpg", description:"Acr&iacute;lico sobre tela, 40x40cm, 2013", thumb:"c2.jpg"},
    //  {id:"k3", alt:"Pili", path:"k3.jpg", description:"Esmalte sint&eacute;tico, 25x33cm, 2006", thumb:"c3.jpg"},
    //  {id:"k4", alt:"Xela y Berni", path:"k4.jpg", description:"Acr&iacute;lico sobre tela, 120x40cm, 2014", thumb:"c4.jpg"},
    //  {id:"k5", alt:"Miguel", path:"k5.jpg", description:"Acr&iacute;lico sobre tela, 65x60cm, 2014", thumb:"c5.jpg"},
    //  {id:"k6", alt:"Self portrait I", path:"k6.jpg", description:"Esmalte sint&eacute;tico, 60x40cm, 2006", thumb:"c6.jpg"},
    //  {id:"k7", alt:"Zu", path:"k7.jpg", description:"Acr&iacute;lico sobre tela, 27x43cm, 2009", thumb:"c7.jpg"},
    //  {id:"k8", alt:"Miriam", path:"k8.jpg", description:"Acr&iacute;lico sobre tela, 43x27cm, 2009", thumb:"c8.jpg"},
    //  {id:"k9", alt:"La cocina", path:"k9.jpg", description:"Acr&iacute;lico y esmalte sint&eacute;tico, 21x29cm, 2007", thumb:"c9.jpg"},
    //  {id:"k10", alt:"Johnny", path:"k10.jpg", description:"Acr&iacute;lico sobre tela, 55x35cm, 2008", thumb:"c10.jpg"},
    //  {id:"k11", alt:"La charla", path:"k11.jpg", description:"Acr&iacute;lico sobre tela, 43x58cm, 2008", thumb:"c11.jpg"},
    //  {id:"k12", alt:"Rub&eacute;n y Mar&iacute;a", path:"k12.jpg", description:"Acr&iacute;lico sobre tela, 45x25cm, 2008", thumb:"c12.jpg"},
    //  {id:"k13", alt:"Mira en ti", path:"k13.jpg", description:"Acr&iacute;lico sobre tela, 100x100cm, 2001", thumb:"c13.jpg"},
    //  {id:"k14", alt:"La Siesta", path:"k14.jpg", description:"Acr&iacute;lico sobre tela, 40x35cm, 2013 ", thumb:"c14.jpg"},
    //  {id:"k15", alt:"Sara", path:"k15.jpg", description:"Acr&iacute;lico sobre tela, 50x100cm, 2005", thumb:"c15.jpg"},
    //  {id:"k16", alt:"El recreo", path:"k16.jpg", description:"Acr&iacute;lico y esmalte sint&eacute;tico  sobre tabla, 160x120cm, 2006", thumb:"c16.jpg"},
    //  {id:"k17", alt:"Santiago", path:"k17.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 70x32cm, 2005", thumb:"c17.jpg"},
    //  {id:"k18", alt:"Murgartegui", path:"k18.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 100x160cm, 2006", thumb:"c18.jpg"},
    //  {id:"k19", alt:"Los cinco", path:"k19.jpg", description:"Acr&iacute;lico y esmalte sint&eacute;tico sobre tabla, 160x80cm, 2006", thumb:"c19.jpg"},
    //  {id:"k20", alt:"La playa", path:"k23.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004", thumb:"c20.jpg"},
    //  {id:"k21", alt:"La playa II", path:"k21.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 100x50cm, 2005", thumb:"c21.jpg"},
    //  {id:"k22", alt:"Encuentros", path:"k22.jpg", description:"dontknow", thumb:"c22.jpg"},
    //  {id:"k23", alt:"Santiago II", path:"k23.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 33x25cm, 2004", thumb:"c23.jpg"},
    //  {id:"k24", alt:"A R&uacute;a", path:"k24.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004", thumb:"c24.jpg"},
    //  {id:"k25", alt:"La estaci&oacute;n", path:"k25.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004", thumb:"c25.jpg"},
    //  {id:"k26", alt:"Sarula", path:"k26.jpg", description:"Acr&iacute;lico sobre tela, 45x55cm, 2008", thumb:"c26.jpg"},
    //  {id:"k27", alt:"Mari Carmen", path:"k27.jpg", description:"Papel pintado sobre tabla, 70x55xm, 2009", thumb:"c27.jpg"}
  ]
};

  var mix_tech = {
    items:[
    //  {id:"t1",alt: "Tu pensamiento te hace libre", description:"Collage sobre A4, 2011",path:"t1.jpg",thumb:"p1.jpg"},
    //  {id:"t2",alt: "El hombre", description:"Collage sobre A4, 2011",path:"t2.jpg",thumb:"p2.jpg"},
    //  {id:"t3",alt: "La espera", description:"Collage sobre A4, 2011",path:"t3.jpg",thumb:"p3.jpg"},
    //  {id:"t4",alt: "Androide", description:"Collage sobre A4, 2011",path:"t4.jpg",thumb:"p4.jpg"},
    //  {id:"t6",alt:"Donna I" , description:"Collage sobre tabla, 30x70cm, 2011",path:"t5.jpg",thumb:"p5.jpg"},
    //  {id:"t5",alt: "El tiempo II", description:"Collage sobre tabla, 46x61cm, 2010",path:"t6.jpg",thumb:"p6.jpg"},
    //  {id:"t7",alt: "La despedida", description:"Collage sobre A4, 2011",path:"t7.jpg",thumb:"p7.jpg"},
    //  {id:"t8",alt: "El tiempo I", description:"Collage sobre papel, 20x12cm, 2008",path:"t8.jpg",thumb:"p8.jpg"},
    //  {id:"t9",alt: "Las tres Mar&iacute;as", description:"Collage sobre A4, 2007",path:"t9.jpg",thumb:"p9.jpg"},
    //  {id:"t10",alt: "Sin t&iacute;tulo", description:"Collage sobre A5, 2008",path:"t10.jpg",thumb:"p10.jpg"},
    //  {id:"t11",alt: "Mujer con pajaros", description:"L&aacute;piz acuarelable, 46x61cm, 2015",path:"t11.jpg",thumb:"p11.jpg"},
    //  {id:"t12",alt: "Mujer-pez I", description:"pilot y acuarela, 46x61cm, 2008",path:"t12.jpg",thumb:"p12.jpg"},
    //  {id:"t13",alt: "Quedate callada", description:"Collage, 46x61cm, 2009",path:"t13.jpg",thumb:"p13.jpg"},
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
// db Intstantiation
   db.serialize(function(){

  //   db.run("DROP TABLE IF EXISTS PAINTING");
  //  db.run("DROP TABLE IF EXISTS MIX_TECH");
  //    db.run("CREATE TABLE PAINTING ("+
  //    "id TEXT,"+
  //    " alt TEXT,"+
  //    " path TEXT,"+
  //    "description TEXT,"+
  //    "thumb TEXT,"+
  //    "timestamp LONG"+
  //    ")");
  //    db.run("CREATE TABLE MIX_TECH ("+
  //    "id TEXT,"+
  //    "alt TEXT,"+
  //    "path TEXT,"+
  //    "description TEXT,"+
  //    "thumb TEXT,"+
  //    "timestamp LONG"+
  //    ")");
   //
  //    var stmt = db.prepare("INSERT INTO MIX_TECH VALUES (?,?,?,?,?,?)");
  //    for (var i = mix_tech.items.length-1; i >=0 ; i--) {
  //         var mix = mix_tech.items[i];
  //        stmt.run(mix.id,mix.alt,mix.path,mix.description,mix.thumb,Date.now()-200*i);
  //    }
  //    stmt.finalize();
  //    var stmt = db.prepare("INSERT INTO PAINTING VALUES (?,?,?,?,?,?)");
  //    for (var i = paintings.items.length-1; i >=0 ; i--) {
  //       var paint = paintings.items[i];
  //        stmt.run(paint.id,paint.alt,paint.path,paint.description,paint.thumb,Date.now()-200*i);
  //    }
  //    stmt.finalize();
  loadDB();
   });
   function loadDB(){
     db.each("SELECT * FROM PAINTING ORDER BY timestamp DESC", function(err, row) {
       paintings.items.push({id:row.id,alt: row.alt, description:row.description,path:row.path,thumb:row.thumb});
     });
     db.each("SELECT * FROM MIX_TECH ORDER BY timestamp DESC", function(err, row) {
       mix_tech.items.push({id:row.id,alt: row.alt, description:row.description,path:row.path,thumb:row.thumb});
     });
   }
    var app = express();
   //  middleware = mid;
    if (middleware) {
        app.use(middleware);
    }

    app.use(express.static("public"));
    app.use(express.static("admin"));
    app.use(fileUpload());
    app.use(bodyParser.json());
    app.all("/admin",function(req,res,callback){
      console.log("accessing admin");
      res.sendFile('index.html',{root:"admin"});
      // callback();
      // res.sendFile("index.html");
   });


   app.post('/admin/upload', function(req, res) {
     console.log(req);
     if (!req.files)
       return res.status(400).send('No files were uploaded.');

     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
     let mainFile = req.files.mainFile;
     let thumbFile = req.files.thumbFile;

     // Use the mv() method to place the file somewhere on your server
     mainFile.mv('public/images/gallery_pictures/'+
          req.body.gallery+'/'+mainFile.name, function(err) {
       handleError(err,500,res);
       thumbFile.mv('public/images/gallery_pictures/'+
          req.body.gallery+'/'+thumbFile.name, function(error) {
       handleError(err,500,res);
      res.send('File uploaded!');
      var stmt = db.prepare("INSERT INTO "+req.body.gallery+" VALUES (?,?,?,?,?,?)");
      stmt.run(null,null,mainFile.name,null,thumbFile.name,Date.now());
      stmt.finalize();
      mix_tech.items.length=0;
      paintings.items.length=0;
      loadDB();
     });
     });
   });

    var latestId = 0;
    var todos = [];
    var lastDeleted = [];
    var stateChangeId = 0;
    var status = {"notFound": 404, "ok": 200, "created": 201};

    // Read
    app.get("/api/paintings/state", function(req, res) {
        res.json(stateChangeId);
    });
    app.get("/api/paintings",function(req,res){
      res.json({items:gallery.paintings.items,folder:"images/gallery_pictures/painting/"});
    });
    app.delete("/api/gallery/:id",function(req,res){
      var id = req.params.id.split("/");
      console.log(id);
      console.log(id)
      var selectedImage = _.find(gallery[id[0]].items,function(img){
        return img.path === id[1];
      });
      gallery[id[0]].items = gallery[id[0]].items.filter(function(otherImage) {
                    return otherImage !== selectedImage;
      });
      console.log(selectedImage.alt);
      res.sendStatus(200);
    });
    app.get("/api/gallery",function(req,res){
      res.json({item:[
        {items:gallery.paintings.items,folder:gallery.paintings.folder+"s"},
        {items:gallery.mix_tech.items,folder:gallery.mix_tech.folder}
      ]});
    });
    app.get("/api/mix_tex",function(req,res){
      res.json({items:gallery.mix_tech.items,folder:"images/gallery_pictures/mix_tech/"});
   });
   app.get("/api/mix_tex/:id",function(req,res){
      var id = parseInt(req.params.id);
      console.log(id);
      var prevId = (id-1)>0?id-1:mix_tech.items.length-1;
      var nextId = (id+1)%mix_tech.items.length;
      console.log(prevId  +  " "+ nextId);
      res.json({item:gallery.mix_tech.items[id],folder:"images/gallery_pictures/mix_tech/",
         nextImg:nextId,
         prevImg:prevId
      });
   });

    app.get("/api/paintings/:id",function(req,res){
      var id = parseInt(req.params.id);
      console.log(id);
      var prevId = (id-1)>=0?id-1:paintings.items.length-1;
      var nextId = (id+1)%paintings.items.length;
      console.log(prevId  +  " "+ nextId);
      res.json({
         item: gallery.paintings.items[id], folder:"images/gallery_pictures/painting/",
         prevImg:prevId,
         nextImg:nextId,
         itemsLength: paintings.items.length
      });
    });

function handleError(err,code,res){
  if (err){
    return res.status(code).send(err);
  }
}


    // Update
    app.put("/api/todo/:id", function(req, res) {
        var id = req.params.id;
        if (id === "undo") {
            if (lastDeleted.length > 0) {
                todos = todos.concat(lastDeleted);
                todos.sort(function(a, b) {
                    return parseInt(a.id) > parseInt(b.id) ? 1 : -1;
                });
                lastDeleted = [];
                stateChangeId++;
                res.sendStatus(status.ok);
            } else {
                res.sendStatus(status.notFound);
            }
        } else {
            var todo = getTodo(id);
            if (todo) {
                if (req.body.title) {
                    todo.title = req.body.title;
                }
                if (req.body.isComplete) {
                    todo.isComplete = req.body.isComplete;
                }
                stateChangeId++;
                res.sendStatus(status.ok);
            } else {
                res.sendStatus(status.notFound);
            }
        }
    });

    function getTodo(id,list) {
        return _.find(list, function(todo) {
            return todo.id === id;
        });
    }
    function getComplete() {
        return todos.filter(function(todo) {
            return todo.isComplete;
        });
    }
    function getInComplete() {
        return todos.filter(function(todo) {
            return !todo.isComplete;
        });
    }

    var server = app.listen(port, callback);

    // We manually manage the connections to ensure that they're closed when calling close().
    var connections = [];
    server.on("connection", function(connection) {
        connections.push(connection);
    });

    return {
        close: function(callback) {
            connections.forEach(function(connection) {
                connection.destroy();
            });
            db.close();
            server.close(callback);
        }
    };
};
