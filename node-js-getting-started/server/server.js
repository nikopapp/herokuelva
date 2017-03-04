var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
var fs = require("fs");
// var mailin = require("mailin");
var statusCode = {"notFound": 404, "ok": 200, "created": 201};

// var db = require("sqlite3");
// db.verbose();
// console.log(db);
// console.log(db.open("../database/image.db"));
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
     {id:"k0", alt:"The Search", path:"k0.jpg", description:"Acr&iacute;lico sobre papel Fabri&aacute;no \"Pittura\", 70x50cm, 2016", thumb:"c0.jpg"},
     {id:"k1", alt:"Ana", path:"k1.jpg", description:"Acr&iacute;lico sobre tela, 70x60cm, 2015", thumb:"c1.jpg"},
     {id:"k2", alt:"Self portrait II", path:"k2.jpg", description:"Acr&iacute;lico sobre tela, 40x40cm, 2013", thumb:"c2.jpg"},
     {id:"k3", alt:"Pili", path:"k3.jpg", description:"Esmalte sint&eacute;tico, 25x33cm, 2006", thumb:"c3.jpg"},
     {id:"k4", alt:"Xela y Berni", path:"k4.jpg", description:"Acr&iacute;lico sobre tela, 120x40cm, 2014", thumb:"c4.jpg"},
     {id:"k5", alt:"Miguel", path:"k5.jpg", description:"Acr&iacute;lico sobre tela, 65x60cm, 2014", thumb:"c5.jpg"},
     {id:"k6", alt:"Self portrait I", path:"k6.jpg", description:"Esmalte sint&eacute;tico, 60x40cm, 2006", thumb:"c6.jpg"},
     {id:"k7", alt:"Zu", path:"k7.jpg", description:"Acr&iacute;lico sobre tela, 27x43cm, 2009", thumb:"c7.jpg"},
     {id:"k8", alt:"Miriam", path:"k8.jpg", description:"Acr&iacute;lico sobre tela, 43x27cm, 2009", thumb:"c8.jpg"},
     {id:"k9", alt:"La cocina", path:"k9.jpg", description:"Acr&iacute;lico y esmalte sint&eacute;tico, 21x29cm, 2007", thumb:"c9.jpg"},
     {id:"k10", alt:"Johnny", path:"k10.jpg", description:"Acr&iacute;lico sobre tela, 55x35cm, 2008", thumb:"c10.jpg"},
     {id:"k11", alt:"La charla", path:"k11.jpg", description:"Acr&iacute;lico sobre tela, 43x58cm, 2008", thumb:"c11.jpg"},
     {id:"k12", alt:"Rub&eacute;n y Mar&iacute;a", path:"k12.jpg", description:"Acr&iacute;lico sobre tela, 45x25cm, 2008", thumb:"c12.jpg"},
     {id:"k13", alt:"Mira en ti", path:"k13.jpg", description:"Acr&iacute;lico sobre tela, 100x100cm, 2001", thumb:"c13.jpg"},
     {id:"k14", alt:"La Siesta", path:"k14.jpg", description:"Acr&iacute;lico sobre tela, 40x35cm, 2013 ", thumb:"c14.jpg"},
     {id:"k15", alt:"Sara", path:"k15.jpg", description:"Acr&iacute;lico sobre tela, 50x100cm, 2005", thumb:"c15.jpg"},
     {id:"k16", alt:"El recreo", path:"k16.jpg", description:"Acr&iacute;lico y esmalte sint&eacute;tico  sobre tabla, 160x120cm, 2006", thumb:"c16.jpg"},
     {id:"k17", alt:"Santiago", path:"k17.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 70x32cm, 2005", thumb:"c17.jpg"},
     {id:"k18", alt:"Murgartegui", path:"k18.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 100x160cm, 2006", thumb:"c18.jpg"},
     {id:"k19", alt:"Los cinco", path:"k19.jpg", description:"Acr&iacute;lico y esmalte sint&eacute;tico sobre tabla, 160x80cm, 2006", thumb:"c19.jpg"},
     {id:"k20", alt:"La playa", path:"k23.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004", thumb:"c20.jpg"},
     {id:"k21", alt:"La playa II", path:"k21.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 100x50cm, 2005", thumb:"c21.jpg"},
     {id:"k22", alt:"Encuentros", path:"k22.jpg", description:"dontknow", thumb:"c22.jpg"},
     {id:"k23", alt:"Santiago II", path:"k23.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 33x25cm, 2004", thumb:"c23.jpg"},
     {id:"k24", alt:"A R&uacute;a", path:"k24.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004", thumb:"c24.jpg"},
     {id:"k25", alt:"La estaci&oacute;n", path:"k25.jpg", description:"Esmalte sint&eacute;tico sobre tabla, 25x33cm, 2004", thumb:"c25.jpg"},
     {id:"k26", alt:"Sarula", path:"k26.jpg", description:"Acr&iacute;lico sobre tela, 45x55cm, 2008", thumb:"c26.jpg"},
     {id:"k27", alt:"Mari Carmen", path:"k27.jpg", description:"Papel pintado sobre tabla, 70x55xm, 2009", thumb:"c27.jpg"}
  ]
};

  var mix_tech = {
    items:[
     {id:"t1",alt: "Tu pensamiento te hace libre", description:"Collage sobre A4, 2011",path:"t1.jpg",thumb:"p1.jpg"},
     {id:"t2",alt: "El hombre", description:"Collage sobre A4, 2011",path:"t2.jpg",thumb:"p2.jpg"},
     {id:"t3",alt: "La espera", description:"Collage sobre A4, 2011",path:"t3.jpg",thumb:"p3.jpg"},
     {id:"t4",alt: "Androide", description:"Collage sobre A4, 2011",path:"t4.jpg",thumb:"p4.jpg"},
     {id:"t6",alt:"Donna I" , description:"Collage sobre tabla, 30x70cm, 2011",path:"t5.jpg",thumb:"p5.jpg"},
     {id:"t5",alt: "El tiempo II", description:"Collage sobre tabla, 46x61cm, 2010",path:"t6.jpg",thumb:"p6.jpg"},
     {id:"t7",alt: "La despedida", description:"Collage sobre A4, 2011",path:"t7.jpg",thumb:"p7.jpg"},
     {id:"t8",alt: "El tiempo I", description:"Collage sobre papel, 20x12cm, 2008",path:"t8.jpg",thumb:"p8.jpg"},
     {id:"t9",alt: "Las tres Mar&iacute;as", description:"Collage sobre A4, 2007",path:"t9.jpg",thumb:"p9.jpg"},
     {id:"t10",alt: "Sin t&iacute;tulo", description:"Collage sobre A5, 2008",path:"t10.jpg",thumb:"p10.jpg"},
     {id:"t11",alt: "Mujer con pajaros", description:"L&aacute;piz acuarelable, 46x61cm, 2015",path:"t11.jpg",thumb:"p11.jpg"},
     {id:"t12",alt: "Mujer-pez I", description:"pilot y acuarela, 46x61cm, 2008",path:"t12.jpg",thumb:"p12.jpg"},
     {id:"t13",alt: "Quedate callada", description:"Collage, 46x61cm, 2009",path:"t13.jpg",thumb:"p13.jpg"},
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
    var app = express();
   //  middleware = mid;
    if (middleware) {
        app.use(middleware);
    }

    app.use(express.static("public"));
    app.use(express.static("admin"));
    app.use(bodyParser.json());
    app.all("/admin",function(req,res,callback){
      if(req.method==="POST"){
         saveUploaded(req,res);
      }
      console.log("accessing admin");
      res.sendFile('index.html',{root:"admin"});
      // callback();
      // res.sendFile("index.html");
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

    app.get("/api/mix_tex",function(req,res){
      res.json({items:gallery.mix_tech.items,folder:"images/gallery_pictures/mix_tech/"});
   });
   app.get("/api/mix_tech/:id",function(req,res){
      var id = parseInt(req.params.id.substring(1));
     res.json({item:gallery.mix_tech.items[id],folder:"images/gallery_pictures/mix_tech/"});
   });

    app.get("/api/painting/:id",function(req,res){
      var id = parseInt(req.params.id.substring(1));
      console.log(id);
      res.json({item:paintings.items[id], folder:"images/gallery_pictures/painting/"});
    });

   //  Upload
    app.post("/admin/upload", function(req,res,next){
      console.log(next.toString());
      for(x in req){
         console.log("req:" +req.x);
      }
      for(x in req.params){
         console.log("params:" +x);
      }
      saveUploaded(req,res);
   });
function saveUploaded(req,res){
   fs.readFile(req.params.painting.toString(), function (err, data) {
      // ...
      var newPath = "nikos.jpg";
      fs.writeFile(newPath, data, function (err) {
         res.redirect("back");
      });
   });

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

    function getTodo(id) {
        return _.find(todos, function(todo) {
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
            server.close(callback);
        }
    };
};
