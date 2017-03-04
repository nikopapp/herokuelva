var app_ang = angular.module("mix_tech", ["ngResource"]);


// Creates the $resource connection to the server
app_ang.factory("Mix", function($resource) {
    var TodoObject = $resource("/api/mix_tex/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
app_ang.controller("gridVC", ["$scope", "Mix", function(scope, Mix) {
    scope.placeholderClassName = "";
   //  scope.paintings = [
   //    {id:"k0", path: baseDir+"c0.jpg"},
   //    {id:"k1", path: baseDir+"c1.jpg"},
   //    {id:"k2", path: baseDir+"c2.jpg"}
   //
   // ];
   Mix.get().$promise.then(function(data){
      console.log(data);
      scope.paintings = data.items;
      scope.folder = data.folder;
   });
}]);
