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
app_ang.controller("infoVC", ["$routeParams", function(routeParams) {
  console.log(routeParams.id);
  var idNum = parseInt(routeParams.id);
  this.imageId = "k"+(idNum);
  this.imageSrc = "images/gallery_pictures/painting/k" + (idNum) + ".jpg";
    this.placeholderClassName = "";
  this.getNext = function(){
    idNum = (idNum + 1)%28;
    this.imageSrc = "images/gallery_pictures/painting/k" + (idNum) + ".jpg";
    this.imageId = "k"+((idNum));
  }
  this.getPrev = function(){
    if(idNum > 0){
      idNum--;
    } else{
      idNum = 27;
    }
    this.imageSrc = "images/gallery_pictures/painting/k" + (idNum) + ".jpg";
    this.imageId = "k"+(idNum);
  }
}]);
