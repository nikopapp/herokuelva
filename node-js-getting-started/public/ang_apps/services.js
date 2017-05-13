// Creates the $resource connection to the server
angular.module("paintings").factory("Painting", function($resource) {
    var TodoObject = $resource("/api/paintings/:id", {id: "@id"}, {
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
angular.module("paintings").factory("Islamic", function($resource) {
    var TodoObject = $resource("/api/islamic/:id", {id: "@id"}, {
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
  console.log(routeParams);
  self.languageObj = {
    value: routeParams.lang
  };
  self.titleBank = {
    "ENG": {
      paintings: "Paintings",
      mix_tech: "Mixed Techniques",
      islamic: "Islamic Art",
      watercolor: "Watercolour"
     },
    "ESP": {
      paintings: "Pintura",
      mix_tech: "Tecnicas Mixtas",
      islamic: "Arte Islamico",
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
