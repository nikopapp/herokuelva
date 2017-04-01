var app_ang = angular.module("mix_tech", ["ngResource", "ngRoute"]);

app_ang.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        controller: "gridVC as paintingCtrl",
        templateUrl: "ang_apps/templates/gridView.html"
    }).when("/info/:id", {
        controller: "infoVC as info",
        templateUrl: "ang_apps/templates/infoView.html"
    }).otherwise({
        redirectTo: "/"
    });
}]);
// Creates the $resource connection to the server
app_ang.factory("Mix", function($resource) {
    var TodoObject = $resource("/api/mix_tex/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});

app_ang.controller("gridVC", ["$scope", "Mix", function(scope, Mix) {
    var self = this;
    self.placeholderClassName = "";
   Mix.get().$promise.then(function(data){
      console.log(data);
      self.paintings = data.items;
      self.folder = data.folder;
   });
}]);

app_ang.controller("navCtrl", ["$scope", "languageService", function(scope,languageService) {
 var self = this;
 self.menuENG = {
    artwork: "ARTWORK",
    paintings: "PAINTINGS",
    mix_tech: "MIXED TECHNIQUES",
    islamic: "ISLAMIC ART"
 };
 self.menuESP = {
    artwork: "OBRAS",
    paintings: "PINTURA",
    mix_tech: "TECNICAS MIXTAS",
    islamic: "ARTE ISLAMICA"
 };

  self.menu = self.menuENG;
  self.languageObj = languageService.setBind();
  console.log("hola!" + self.languageObj.value);
  self.setLangESP = function(){
    console.log("changed");
    self.languageObj.value = "ESP";
    self.menu = self.menuESP;
  }
  self.setLangENG = function(){
    console.log("changed");
    self.languageObj.value = "ENG";
    self.menu = self.menuENG;
  }
}]);

app_ang.controller("infoVC", ["$scope","$routeParams","Mix","languageService",
            function(scope,routeParams,Mix,languageService) {
  console.log(routeParams.id);
  var idNum = parseInt(routeParams.id);
  var self = this;
  self.eng="ENG";
  self.esp="ESP";

  self.blowUp = function($event){
    console.log("blowUp",$event);
    self.imageClass = "blowUp";
  }
  self.languageObj = languageService.setBind();

  self.refresh = refresh;
  function refresh(idNum){
    Mix.get({id:idNum}).$promise.then(function(data){
      self.imageId = data.item.id;
      self.imageAlt = data.item.alt;
      console.log(data.item)
      if(data.item.descriptionENG){
        self.imageDescENG =data.item.descriptionENG.split(", ");
      }
      if(data.item.descriptionESP){
        self.imageDescESP = data.item.descriptionESP.split(", ");
      }
      self.imageSrc = "images/gallery_pictures/mix_tech/" + data.item.path;
      self.placeholderClassName = "";
      self.getNext = function(){
        var newId = (idNum + 1)%data.itemsLength;
        console.log(newId);
        refresh(newId);
      }
      self.getPrev = function(){
        var x = (idNum - 1);
        var newId = x >=0?x:data.itemsLength-1;
        console.log(newId);
        refresh(newId);
      }
    }).catch(function(err){
      console.log(err);
    });
  }
  refresh(idNum);
}]);

app_ang.service("languageService", function() {
  var self = this;
  self.languageObj = {
    value: "ENG"
  };
  self.setBind = function(){
    return self.languageObj;
  };
});
