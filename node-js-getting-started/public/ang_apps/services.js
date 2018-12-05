// Creates the $resource connection to the server
angular.module("paintings").factory("Colourfields", function($resource) {
    var TodoObject = $resource("/api/colourfields_series/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
angular.module("paintings").factory("Mix", function($resource) {
    var TodoObject = $resource("/api/mix_tex/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
angular.module("paintings").factory("Watercolor", function($resource) {
    var TodoObject = $resource("/api/watercolor/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
angular.module("paintings").service("languageService", ["$routeParams", function(routeParams) {
  var self = this;

  self.languageObj = {
    value: routeParams.lang
  };
  self.titleBank = {
    "ENG": {
      colourfields_series: "Colourfields Series",
      mix_tech: "Mixed Techniques",
      watercolor: "Watercolour"
     },
    "ESP": {
      colourfields_series: "Series Campos de color",
      mix_tech: "Tecnicas Mixtas",
      watercolor: "Acuarela"
    }
  }
  self.menu;

  self.setMenu = function(menu){
    self.menu = menu;
    if(self.setTitle){
      self.setTitle(self.titleBank[self.languageObj.value][self.gallery]);
    }
  }
  self.getTitleBank = function(obj){
    return self.titleBank[obj.value];
  }
  self.bindSetTitle = function(funcTitle, gallery){
    self.gallery = gallery;
    self.setTitle = funcTitle;
  };
  self.setBind = function(){
    return self.languageObj;
  };
}]);
