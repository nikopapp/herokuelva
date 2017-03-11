var app_ang = angular.module("mix_tech", ["ngResource", "ngRoute"]);

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
app_ang.factory("Mix", function($resource) {
    var TodoObject = $resource("/api/mix_tex/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
app_ang.controller("gridVC", ["$scope", "Mix", function(scope, Mix) {
    scope.placeholderClassName = "";
   Mix.get().$promise.then(function(data){
      console.log(data);
      scope.paintings = data.items;
      scope.folder = data.folder;
   });
}]);
app_ang.controller("infoVC", ["$scope", "Mix", function(scope, Mix) {
    scope.placeholderClassName = "";
}]);
