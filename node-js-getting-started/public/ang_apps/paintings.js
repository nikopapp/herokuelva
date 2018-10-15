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
    }).when("/info/:gallery/:id", {
        controller: "PinfoVC as info",
        templateUrl: "ang_apps/templates/infoView.html"
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
angular.module("paintings").controller("PgridVC", ["$scope", "Painting", "Mix", "Watercolor", "$routeParams", "languageService",
        function(scope, Painting, Mix, Watercolor, routeParams, languageService) {
    var self = this;
    self.languageObj = languageService.setBind;
    console.log(routeParams);
    self.gallery = routeParams.gallery;
    self.getPaint = getPaintings;
    self.getMix = getMixTech;
    self.getWatercolor = getWatercolor;
    self.scrollToTop = scrollToTopFunc;
    if(routeParams.gallery === "paintings"){
      document.getElementsByTagName("body")[0].className = "normal";
      self.getPaint();
      if(routeParams.lang === "ENG"){
        self.title = {value: "Paintings"};
      } else {
        self.title = {value: "Pintura"};
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
    function getWatercolor(){
      Watercolor.get().$promise.then(function(data){
        self.paintings = data.items;
        self.folder = data.folder;
      });
    }
    function scrollToTopFunc(event){
      console.log("myevent",event);
      window.scroll(0,0);
    }
}]);
angular.module("paintings").controller("navCtrl", ["$scope", "languageService","$routeParams", function(scope,languageService,routeParams) {
 var self = this;
 self.languageObj = languageService.setBind();
 self.menuENG = {
    artwork: "ARTWORK",
    paintings: "PAINTINGS",
    mix_tech: "MIXED TECHNIQUES",
    watercolor: "WATERCOLOUR"
 }
 self.menuESP = {
    artwork: "OBRAS",
    paintings: "PINTURA",
    mix_tech: "TECNICAS MIXTAS",
    watercolor: "ACUARELA"
 }
  self.titleHead = " - Personal Gallery";
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
  self.gallery = "normal";

}]);


angular.module("paintings").controller("PinfoVC", ["$scope", "$routeParams", "Painting","Mix", "Watercolor", "languageService",
              function(scope, routeParams, Painting, Mix, Watercolor, languageService) {
  console.log(routeParams);
  var idNum = parseInt(routeParams.id);
  var self = this;
  self.eng="ENG";
  self.esp="ESP";
  if(routeParams.gallery === "paintings"){
    self.currentGallery = Painting;
  } else if (routeParams.gallery === "mix_tech"){
    self.currentGallery = Mix;
  } else {
    self.currentGallery = Watercolor;
  }
  self.blowUp = function($event){
    console.log("blowUp",$event);
    self.imageClass = "blowUp";
  }
  self.languageObj = languageService.setBind();

  self.refresh = refresh;
  function refresh(idNum, resource){
    resource.get({id:idNum}).$promise.then(function(data){
      console.log(data);
      self.imageId = data.item.id;
      self.imageAlt = data.item.alt;
      if(data.item.descriptionENG){
        self.imageDescENG =data.item.descriptionENG.split(". ");
      }
      if(data.item.descriptionESP){
        self.imageDescESP = data.item.descriptionESP.split(". ");
      }

      self.imageSrc = data.folder + data.item.path;
      self.imageSrcNext = data.folder + data.nextImg.path;
      self.imageSrcPrev = data.folder + data.prevImg.path;
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
