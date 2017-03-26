const express = require("express");
const bodyParser = require("body-parser");
const _ = require("underscore");
const fileUpload = require("express-fileupload");

const cookieParser = require('cookie-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session      = require('express-session');
const userdb = require('./db');
const ensurelog = require('connect-ensure-login');

passport.use(new Strategy(
  function(username, password, cb) {
    console.log(username);
    userdb.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    userdb.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

// var mailin = require("mailin");
<<<<<<< HEAD
var statusCode = {"notFound": 404, "ok": 200, "created": 201};

var slqite = require("sqlite3").verbose();
var db = new sqlite.Database("../database/images.db");
console.log(db);
console.log(db.open("../database/image.db"));
// var infoBuild = require("../public/nodeScripts/build_info");
// var mid = function(req,res,callback){
//    if(req.url === "/info.html?k1")  {
//       console.log(req.url.toString()+"\n"+res);
//       infoBuild.buildInfoPage(req.url, "k1");
//    }
//    callback();
// };
=======
>>>>>>> 151427aaf2332eb6d19039c6135c16c9653048eb

const sql = require("sqlite3").verbose();
var db = new sql.Database("database/db.sqlite3");

const statusCode = {"notFound": 404, "ok": 200, "created": 201};
module.exports = function(port, middleware, callback) {
   //------------------ descriptions
   var paintings = {
      items:[]
};

  var mix_tech = {
    items:[]
};
   var gallery = {
      paintings: {
         items: paintings.items,
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

  //  --------------------------------------------------------------------------
  //  --------------------------------ExpressAppStarts--------------------------
  //  --------------------------------------------------------------------------
  //  --------------------------------------------------------------------------
    var app = express();
    if (middleware) {
        app.use(middleware);
    }
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json());
    app.use(require('body-parser').urlencoded({ extended: true }));

    // required for passport
    app.use(session({ secret: 'ilovescotchscotchyscotchscotch', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

// -------------------------MyLOG-----------------------------------------------
    // app.use(function(req,res,next) {
    //   console.log(req.method, req.url);
    //   next();
    // });

// ----------------------------------------------------------------------
  app.use(fileUpload());
  app.use(express.static("public"));

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login.html' }),
    function(req, res) {
      res.redirect('/admin/index.html');
  });
  app.get('/profile',
  ensurelog.ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
});
  app.get("/admin",
  ensurelog.ensureLoggedIn(),
    function(req,res,next){
      res.sendFile("index.html",{root:"admin"});
    });
   app.get("/admin/:file",
   ensurelog.ensureLoggedIn(),
   function(req,res,next){
     res.sendFile(req.params.file,{root:"admin"});
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
      res.json({
        item:gallery.mix_tech.items[id],folder:"images/gallery_pictures/mix_tech/",
        nextImg:nextId,
        prevImg:prevId,
        itemsLength: mix_tech.items.length
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
