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

  scope.refresh = refresh;
  function refresh(idNum){
    Painting.get({id:idNum}).$promise.then(function(data){
      scope.imageId = data.item.id;
      scope.imageAlt=data.item.alt;
      if(data.item.description){
        scope.imageDesc=data.item.description.split(", ");
      }
      console.log(data.itemsLength);
      scope.imageSrc = "images/gallery_pictures/painting/" + data.item.path;
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
}]);
