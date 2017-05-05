// TODO
// complete the next image prev images

var app_ang = angular.module("paintings", ["ngResource", "ngRoute"]);

app_ang.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      controller: "homeVC as home",
      templateUrl: "ang_apps/templates/homeView.html"
    }).when("/:lang",{
        controller: "homeVC as home",
        templateUrl: "ang_apps/templates/homeView.html"
    })
    .when("/grid/:gallery/:lang", {
        controller: "PgridVC as paintingCtrl",
        templateUrl: "ang_apps/templates/gridView.html"
    }).when("/info/:gallery/:id", {
        controller: "PinfoVC as info",
        templateUrl: "ang_apps/templates/infoView.html"
    }).when("/about/elva", {
      controller: "aboutCtrl as about",
      templateUrl: "ang_apps/templates/aboutView.html"
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
app_ang.factory("Mix", function($resource) {
    var TodoObject = $resource("/api/mix_tex/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});
app_ang.controller("homeVC", ["$scope", function(scope) {
    var self = this;
    self.title = "Elva Arce - Home";
}]);

app_ang.controller("aboutCtrl", [function(){
    var self = this;
    
}]);
app_ang.controller("PgridVC", ["$scope", "Painting", "Mix", "$routeParams", "languageService",
        function(scope, Painting, Mix, routeParams, languageService) {
    var self = this;
    self.languageObj = languageService.setBind;
    console.log(routeParams);
    self.gallery = routeParams.gallery;
    self.getPaint = getPaintings;
    self.getMix = getMixTech;
    if(routeParams.gallery === "paintings"){
      self.getPaint();
      if(routeParams.lang === "ENG"){
        self.title = {value: "Paintings"};
      } else {
        self.title = {value: "Pintura"};
      }
    } else {
      self.getMix();
      if(routeParams.lang === "ENG"){
        self.title = {value: "Mixed Techniques"};
      } else {
        self.title ={ value: "Tecnicas Mixtas"};
      }
    }
    self.setTitle = function(value){
      self.title.value = value;
    };
    self.placeholderClassName = "";
    languageService.bindSetTitle(self.setTitle, routeParams.gallery);
    function getPaintings() {
      Painting.get().$promise.then(function(data){
        self.paintings = data.items;
        self.folder = data.folder;
      });
    };
    function getMixTech() {
      Mix.get().$promise.then(function(data){
        self.paintings = data.items;
        self.folder = data.folder;
      });
    };
}]);
app_ang.controller("MgridVC", ["$scope", "Mix", "languageService",
          function(scope, Mix, languageService) {
    var self = this;
    self.title = {value:"Mixed Techniques"};
    self.setTitle = function(value){
      self.title.value = value;
    };
    self.placeholderClassName = "";
    languageService.bindSetTitle(self.setTitle, "mix_tech");
    Mix.get().$promise.then(function(data){
      self.paintings = data.items;
      self.folder = data.folder;
    });
}]);

app_ang.controller("navCtrl", ["$scope", "languageService","$routeParams", function(scope,languageService,routeParams) {
 var self = this;
 console.log(window.location.href);
    self.languageObj = languageService.setBind();
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
 // self.titleHead = window.location.href
  console.log(routeParams);
  if(self.languageObj.value === "ESP"){
    self.menu = self.menuESP;
  } else{
    self.menu = self.menuENG;
  }
  console.log("hola!" + self.languageObj.value);
  self.setLangESP = function(){
    console.log("changed");
    self.languageObj.value = "ESP";
    languageService.setMenu(self.menuEsp);
    self.menu = self.menuESP;
  }
  self.setLangENG = function(){
    console.log("changed");
    self.languageObj.value = "ENG";
    languageService.setMenu(self.menuEsp);
    self.menu = self.menuENG;
  }
  if(window.location.href.includes("ESP")){
    self.setLangESP();
  } else {
    self.setLangENG();
  }
}]);

app_ang.controller("PinfoVC", ["$scope", "$routeParams", "Painting","Mix", "languageService",
              function(scope, routeParams, Painting, Mix, languageService) {
  console.log(routeParams);
  var idNum = parseInt(routeParams.id);
  var self = this;
  self.eng="ENG";
  self.esp="ESP";
  if(routeParams.gallery === "paintings"){
    self.currentGallery = Painting;
  } else {
    self.currentGallery = Mix;
  }
  self.blowUp = function($event){
    console.log("blowUp",$event);
    self.imageClass = "blowUp";
  }
  self.languageObj = languageService.setBind();

  self.refresh = refresh;
  function refresh(idNum, resource){
    var folder;
    resource.get({id:idNum}).$promise.then(function(data){
      self.imageId = data.item.id;
      self.imageAlt = data.item.alt;
      if(data.item.descriptionENG){
        self.imageDescENG =data.item.descriptionENG.split(", ");
      }
      if(data.item.descriptionESP){
        self.imageDescESP = data.item.descriptionESP.split(", ");
      }
      if(routeParams.gallery === "paintings"){
        folder = "painting";
      }else{
        folder = "mix_tech";
      }
      self.imageSrc = "images/gallery_pictures/"+folder+"/" + data.item.path;
      self.imageSrcNext = "images/gallery_pictures/"+folder+"/" + data.nextImg.path;
      self.imageSrcPrev = "images/gallery_pictures/"+folder+"/" + data.prevImg.path;
      self.imageAltPrev = data.prevImg.alt;
      self.imageAltNext = data.nextImg.alt;

      self.placeholderClassName = "";
      self.getNext = function(){
        var newId = (idNum + 1)%data.itemsLength;
        console.log(newId);
        refresh(newId, self.currentGallery);
      }
      self.getPrev = function(){
        var x = (idNum - 1);
        var newId = x >=0?x:data.itemsLength-1;
        console.log(newId);
        refresh(newId,self.currentGallery);
      }
    }).catch(function(err){
      console.log(err);
    });
  }
  refresh(idNum, self.currentGallery);
}]);

app_ang.service("languageService", ["$routeParams", function(routeParams) {
  var self = this;
  console.log(routeParams);
  self.languageObj = {
    value: routeParams.lang
  };
  self.titleBank = {
    "ENG": {
      paintings: "Paintings",
      mix_tech: "Mixed Techniques"
     },
    "ESP": {
      paintings: "Pintura",
      mix_tech: "Tecnicas Mixtas"
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
