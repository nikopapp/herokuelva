const express     = require("express");
const bodyParser  = require("body-parser");
const _           = require("underscore");
const fileUpload  = require("express-fileupload");

const cookieParser  = require('cookie-parser');
const passport      = require('passport');
const Strategy      = require('passport-local').Strategy;
const session       = require('express-session');
const userdb        = require('./db');
const ensurelog     = require('connect-ensure-login');

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

const sql = require("sqlite3").verbose();
const dbCreate = require("../database/setup/create");

var db = new sql.Database("database/test.sqlite3");
const statusCode = {"notFound": 404, "ok": 200, "created": 201};
module.exports = function(port, middleware, callback) {
   //------------------ descriptions

   var paintings = { items:[] };
   var mix_tech = { items:[] };
   var islamic = { items:[] };
   var watercolor = { items:[] };

   var gallery = {
      paintings: {
         items: paintings.items,
         folder:"painting"
      },
      mix_tech:{
         items: mix_tech.items,
         folder:"mix_tech"
      },
      islamic:{
        items: islamic.items,
        folder:"islamic"
      },
      watercolor:{
        items: watercolor.items,
        folder:"watercolor"
      }
   };
// db Intstantiation
  // dbCreate.startup(db);
  //  db.serialize(function(){
     loadDB();
  //  });
   function loadDB(){
     db.each("SELECT * FROM PAINTING ORDER BY timestamp DESC", function(err, row) {
       paintings.items.push({id:row.id,alt: row.alt, descriptionESP:row.descriptionESP,descriptionENG:row.descriptionENG,path:row.path,thumb:row.thumb});
     });
     db.each("SELECT * FROM MIX_TECH ORDER BY timestamp DESC", function(err, row) {
       mix_tech.items.push({id:row.id,alt: row.alt, descriptionESP:row.descriptionESP,descriptionENG:row.descriptionENG,path:row.path,thumb:row.thumb});
     });
     db.each("SELECT * FROM ISLAMIC ORDER BY timestamp DESC", function(err, row) {
       islamic.items.push({id:row.id,alt: row.alt, descriptionESP:row.descriptionESP,descriptionENG:row.descriptionENG,path:row.path,thumb:row.thumb});
     });
     db.each("SELECT * FROM WATERCOLOR ORDER BY timestamp DESC", function(err, row) {
       watercolor.items.push({id:row.id,alt: row.alt, descriptionESP:row.descriptionESP,descriptionENG:row.descriptionENG,path:row.path,thumb:row.thumb});
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
    app.use(session({ secret: '298734dy2987dy9uiweuyfoiayof87eya8f7t2o7eywfite', resave: false, saveUninitialized: false }));
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
      var stmt = db.prepare("INSERT INTO "+req.body.gallery+" VALUES (?,?,?,?,?,?,?)");
      stmt.run(req.body.id,req.body.alt,mainFile.name,req.body.descriptionESP,req.body.descriptionENG,thumbFile.name,Date.now());
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
    app.get("/api/islamic",function(req,res){
      res.json({items:gallery.islamic.items,folder:"images/gallery_pictures/islamic/"});
    });
    app.get("/api/watercolor",function(req,res){
      res.json({items:gallery.watercolor.items,folder:"images/gallery_pictures/watercolor/"});
    });


    app.delete("/api/gallery/:id",function(req,res){
      var id = req.params.id.split("/");
      console.log(id);
      if(id[0] === "paintings"){
        db.run("DELETE FROM Painting WHERE path='"+id[1]+"'");
      } else if(id[0] === "mix_tech") {
        db.run("DELETE FROM MIX_TECH WHERE path='"+id[1]+"'");
      }
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
        nextImg:gallery.mix_tech.items[nextId],
        prevImg:gallery.mix_tech.items[prevId],
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
         prevImg:gallery.paintings.items[prevId],
         nextImg:gallery.paintings.items[nextId],
         itemsLength: paintings.items.length
      });
    });
    app.get("/api/watercolor/:id",function(req,res){
      var id = parseInt(req.params.id);
      console.log(id);
      var prevId = (id-1)>=0?id-1:paintings.items.length-1;
      var nextId = (id+1)%paintings.items.length;
      console.log(prevId  +  " "+ nextId);
      res.json({
         item: gallery.watercolor.items[id], folder:"images/gallery_pictures/watercolor/",
         prevImg:gallery.watercolor.items[prevId],
         nextImg:gallery.watercolor.items[nextId],
         itemsLength: watercolor.items.length
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
