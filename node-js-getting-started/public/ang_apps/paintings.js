// TODO
// complete the next image prev images

angular.module("paintings", ["ngResource", "ngRoute"]);

angular.module("paintings").config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/", {
      title: "Home",
      controller: "homeVC as home",
      templateUrl: "ang_apps/templates/homeView.html"
    }).when("/:lang",{
        title: "Home",
        controller: "homeVC as home",
        templateUrl: "ang_apps/templates/homeView.html"
    })
    .when("/grid/:gallery/:lang", {
        title: "Gallery",
        controller: "PgridVC as paintingCtrl",
        templateUrl: "ang_apps/templates/gridView.html"
    }).when("/about/elva", {
      title: "Bio",
      controller: "aboutCtrl as paintingCtrl",
      templateUrl: "ang_apps/templates/aboutView.html"
    }).when("/full/video", {
      title: "Video feed",
      controller: "videoCtrl as video",
      templateUrl: "ang_apps/templates/videoView.html"
    }).otherwise({
        redirectTo: "/"
    });
}]);
angular.module("paintings").run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

angular.module("paintings").controller("homeVC", ["$scope", function(scope) {
    var self = this;
    self.titleHead = "Elva Arce - Home";
    document.getElementsByTagName("body")[0].className = "normal";
}]);

angular.module("paintings").controller("aboutCtrl", [function(){
    var self = this;
    self.titleHead = "Elva Arce - About";
    document.getElementsByTagName("body")[0].className = "normal";
}]);
angular.module("paintings").controller("videoCtrl", [function(){
  var self = this;
  self.titleHead = "Elva Arce - Video";
  document.getElementsByTagName("body")[0].className = "normal";
}]);
angular.module("paintings").controller("PgridVC", ["$scope", "Colourfields", "Mix", "Watercolor", "$routeParams", "languageService",
        function(scope, Painting, Mix, Watercolor, routeParams, languageService) {
    var self = this;
    self.languageObj = languageService.setBind;
    self.gallery = routeParams.gallery;
    self.getPaint = getPaintings;
    self.getMix = getMixTech;
    self.getWatercolor = getWatercolor;
    self.scrollToTop = scrollToTopFunc;
    if(routeParams.gallery === "colourfields_series"){
      document.getElementsByTagName("body")[0].className = "normal";
      self.getPaint();
      if(routeParams.lang === "ENG"){
        self.title = {value: "Colourfields Series"};
      } else {
        self.title = {value: "Series Campos de color"};
      }
    } else if(routeParams.gallery === "mix_tech") {
      document.getElementsByTagName("body")[0].className = "normal";
      self.getMix();
      if(routeParams.lang === "ENG"){
        self.title = {value: "Mixed Techniques"};
      } else {
        self.title ={ value: "Técnicas Mixtas"};
      }
    } else if(routeParams.gallery === "watercolor") {
      document.getElementsByTagName("body")[0].className = "normal";
      self.getWatercolor();
      if(routeParams.lang === "ENG"){
        self.title = {value: "Watercolour"};
      } else {
        self.title ={ value: "Acuarela"};
      }
    }
    self.setTitle = function(value){
      self.title.value = value;
    };
    languageService.bindSetTitle(self.setTitle, routeParams.gallery);
    function getPaintings() {
      Painting.get().$promise.then(function(data){
        debugger;
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
    function getWatercolor(){
      Watercolor.get().$promise.then(function(data){
        self.paintings = data.items;
        self.folder = data.folder;
      });
    }
    function scrollToTopFunc(event){
      window.scroll(0,0);
    }
}]);
angular.module("paintings").controller("navCtrl", ["$scope", "languageService","$routeParams", function(scope,languageService,routeParams) {
 var self = this;
 self.languageObj = languageService.setBind();
 self.menuENG = {
    artwork: "ARTWORK",
    paintings: "COLOURFIELDS SERIES",
    mix_tech: "MIXED TECHNIQUES",
    watercolor: "WATERCOLOUR"
 }
 self.menuESP = {
    artwork: "OBRAS",
    paintings: "SERIES CAMPOS DE COLOR",
    mix_tech: "TECNICAS MIXTAS",
    watercolor: "ACUARELA"
 }
  self.titleHead = " - Personal Gallery";

  if(self.languageObj.value === "ESP"){
    self.menu = self.menuESP;
  } else{
    self.menu = self.menuENG;
  }

  self.setLangESP = function(){

    self.languageObj.value = "ESP";
    languageService.setMenu(self.menuEsp);
    self.menu = self.menuESP;
  }
  self.setLangENG = function(){

    self.languageObj.value = "ENG";
    languageService.setMenu(self.menuEsp);
    self.menu = self.menuENG;
  }
  if(window.location.href.includes("ESP")){
    self.setLangESP();
  } else {
    self.setLangENG();
  }
  self.gallery = "normal";

}]);