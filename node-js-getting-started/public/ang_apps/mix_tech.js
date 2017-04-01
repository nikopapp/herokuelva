var app_ang = angular.module("mix_tech", ["ngResource", "ngRoute"]);

app_ang.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        controller: "gridVC as paintingCtrl",
        templateUrl: "ang_apps/templates/gridView.html"
    }).when("/info/:id", {
        controller: "infoVC as info",
        templateUrl: "ang_apps/templates/infoView.html",
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

app_ang.controller("navCtrl", ["$scope", "laguageService", function(scope,languageService) {
 var self = this;
 self.menuENG = {
    artwork: "ARTWORK",
    paintings: "PAINTINGS",
    mix_tech: "MIXED TECHNIQUES",
    islamic: "ISLAMIC ART"
 }
 self.menuESP = {
    artwork: "OBRAS",
    paintings: "PINTURA",
    mix_tech: "TECNICAS MIXTAS",
    islamic: "ARTE ISLAMICA"
 }

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

app_ang.controller("gridVC", ["$scope", "Mix", function(scope, Mix) {
    scope.placeholderClassName = "";
   Mix.get().$promise.then(function(data){
      console.log(data);
      scope.paintings = data.items;
      scope.folder = data.folder;
   });
}]);
app_ang.controller("infoVC", ["$scope","$routeParams","Mix", function(scope,routeParams,Mix) {
  console.log(routeParams.id);
  var idNum = parseInt(routeParams.id);
  scope.refresh = refresh;
  function refresh(idNum){
    Mix.get({id:idNum}).$promise.then(function(data){
      scope.imageId = data.item.id;
      scope.imageAlt=data.item.alt;
      if(data.item.description){
        scope.imageDesc=data.item.description.split(", ");
      }
      scope.imageSrc = "images/gallery_pictures/mix_tech/" + data.item.path;
      scope.placeholderClassName = "";
      scope.getNext = function(){
        var newId = (idNum + 1)%data.itemsLength;
        console.log(newId);
        refresh(newId);
      }
      scope.getPrev = function(){
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
  // this.getNext = function(){
  //   idNum = (idNum + 1)%13;
  //   this.imageSrc = "images/gallery_pictures/mix_tech/t" + (idNum+1) + ".jpg";
  //   this.imageId = "t"+((idNum+1));
  // }
  // this.getPrev = function(){
  //   if(idNum > 0){
  //     idNum--;
  //   } else{
  //     idNum = 12;
  //   }
  //   this.imageSrc = "images/gallery_pictures/mix_tech/t" + (idNum+1) + ".jpg";
  //   this.imageId = "t"+(idNum+1);
  // }
}]);
