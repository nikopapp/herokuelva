var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");

var infoBuild = require("../public/nodeScripts/build_info");
var mid = function(req,res,callback){
   if(req.url === "/info.html?k1")  {
      console.log(req.url.toString()+"\n"+res);
      infoBuild.buildInfoPage(req.url, "k1");
   }
   callback();
};

module.exports = function(port, middleware, callback) {
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
    app.all("*",function(req,res){
      console.log(req+"\n"+res);
      res.set("geiasou", "malaka");
      res.sendStatus(200);
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
