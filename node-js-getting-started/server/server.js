var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");
var statusCode = {"notFound": 404, "ok": 200, "created": 201};
var db = require("sqlite3");
db.verbose();
console.log(db);
// console.log(db.open("../database/image.db"));
var infoBuild = require("../public/nodeScripts/build_info");
var mid = function(req,res,callback){
   if(req.url === "/info.html?k1")  {
      console.log(req.url.toString()+"\n"+res);
      infoBuild.buildInfoPage(req.url, "k1");
   }
   callback();
};

module.exports = function(port, middleware, callback) {
   //------------------ descriptions
   var descriptions = {
     "k0":"Acr&iacute;lico sobre papel Fabri&aacute;no \"Pittura\", 70x50cm, 2016",
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
     "k0":"The Search",
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
   var info = {desc:descriptions, alts:alts};

    var app = express();
   //  middleware = mid;
    if (middleware) {
        app.use(middleware);
    }

    app.use(express.static("public"));
    app.use(bodyParser.json());


    var latestId = 0;
    var todos = [];
    var lastDeleted = [];
    var stateChangeId = 0;
    var status = {"notFound": 404, "ok": 200, "created": 201};

    // Create
    app.post("/api/todo", function(req, res) {
        var todo = req.body;
        todo.isComplete = false;
        todo.id = latestId.toString();
        latestId++;
        stateChangeId++;
        todos.push(todo);
        res.set("Location", "/api/todo/" + todo.id);
        res.sendStatus(status.created);
    });

    // Read
    app.get("/api/todo/state", function(req, res) {
        res.json(stateChangeId);
    });
    app.get("/api/todo",function(req,res){
      res.json(info);
   });
    // Delete
    app.delete("/api/todo/:id", function(req, res) {
        var id = req.params.id;
        if (id === "complete") {
            lastDeleted = getComplete();
            todos = getInComplete();
            stateChangeId++;
            res.sendStatus(status.ok);
        } else {
            var todo = getTodo(id);
            if (todo) {
                lastDeleted = [todo];
                todos = todos.filter(function(otherTodo) {
                    return otherTodo !== todo;
                });
                stateChangeId++;
                res.sendStatus(status.ok);
            } else {
                res.sendStatus(status.notFound);
            }
        }
    });

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
