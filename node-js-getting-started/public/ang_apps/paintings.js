var app_ang = angular.module("paintings", ["ngResource"]);


// Creates the $resource connection to the server
app_ang.factory("Painting", function($resource) {
    var TodoObject = $resource("/api/paintings/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
app_ang.controller("gridVC", ["$scope", "Painting", function(scope, Painting) {
    scope.placeholderClassName = "";
   //  scope.paintings = [
   //    {id:"k0", path: baseDir+"c0.jpg"},
   //    {id:"k1", path: baseDir+"c1.jpg"},
   //    {id:"k2", path: baseDir+"c2.jpg"}
   //
   // ];
   Painting.get().$promise.then(function(data){
      console.log(data);
      scope.paintings = data.items;
      scope.folder = data.folder;
   });
}]);
