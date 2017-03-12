var app_ang = angular.module("paintings", ["ngResource", "ngRoute"]);

app_ang.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        controller: "gridVC as painting",
        templateUrl: "ang_apps/templates/gridView.html"
    }).when("/info/:id", {
        controller: "infoVC as info",
        templateUrl: "ang_apps/templates/infoView.html"
    }).otherwise({
        redirectTo: "/"
    });
}]);
// Creates the $resource connection to the server
app_ang.factory("Painting", function($resource) {
    var TodoObject = $resource("/api/paintings/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
app_ang.controller("gridVC", ["$scope", "Painting", function(scope, Painting) {
    scope.placeholderClassName = "";
   Painting.get().$promise.then(function(data){
      console.log(data);
      scope.paintings = data.items;
      scope.folder = data.folder;
   });
}]);
app_ang.controller("infoVC", ["$scope", "$routeParams", "Painting", function(scope, routeParams,Painting) {
  console.log(routeParams.id);
  var idNum = parseInt(routeParams.id);
  scope.blowUp = function($event){
    console.log("blowUp",$event);
    scope.imageClass = "blowUp";
  }

  Painting.get({id:idNum}).$promise.then(function(data){
    scope.imageId = data.item.id;
    scope.imageAlt=data.item.alt;
    scope.imageDesc=data.item.description.split(", ");
    console.log(data.item.path);
    scope.imageSrc = "images/gallery_pictures/painting/" + data.item.path;
    scope.placeholderClassName = "";
    idNum = (idNum + 1)%data.itemsLength;
    scope.getNext = function(){
      scope.imageSrc = "images/gallery_pictures/painting/k" + (idNum) + ".jpg";
      scope.imageId = "k"+((idNum));
    }
    scope.getPrev = function(){
      if(idNum > 0){
        idNum--;
      } else{
        idNum = 27;
      }
      scope.imageSrc = "images/gallery_pictures/painting/k" + (idNum) + ".jpg";
      scope.imageId = "k"+(idNum);
    }
  }).catch(function(err){
    console.log(err);
  });
}]);
