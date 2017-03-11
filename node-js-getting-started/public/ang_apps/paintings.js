var app_ang = angular.module("paintings", ["ngResource", "ngRoute"]);

app_ang.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
        controller: "gridVC as painting",
        templateUrl: "ang_apps/templates/gridView.html"
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
