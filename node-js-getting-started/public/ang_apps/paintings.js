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
      self.paintings = [{"id":21,"alt":"Angeliki","className":"","path":"angeliki.jpg","descriptionESP":"Acrílico sobre tela, 61x 91 cm, 2017","descriptionENG":"Acrylic on canvas, 61x 91 cm","date":" 2018","thumb":"TODO"},{"id":20,"alt":"Sara","className":"","path":"sara.jpg","descriptionESP":"Acrílico sobre tela, 61x 91 cm, 2017","descriptionENG":"Acrylic on canvas, 61x 91 cm","date":" 2018","thumb":"TODO"},{"id":19,"alt":"La familia","className":"","path":"Family.jpg","descriptionESP":"Acrílico sobre tela, 61x 91 cm, 2017","descriptionENG":"Acrylic on canvas, 61x 91 cm","date":" 2018","thumb":"TODO"},{"id":18,"alt":"Los cinco","className":"","path":"los cinco.jpg","descriptionESP":"Acrílico y esmalte sintético sobre tabla, 160x 80 cm, 2006","descriptionENG":"Acrylic and synthetic enamel on woodboard, 160x 80 cm","date":" 2006","thumb":"c19.jpg"},{"id":17,"alt":"Xela y Berni","className":"","path":"xela.jpg","descriptionESP":"Acrílico sobre tela, 120x 40 cm, 2014","descriptionENG":"Acrylic on canvas, 120x 40 cm","date":" 2014","thumb":"c4.jpg"},{"id":16,"alt":"El recreo","className":"","path":"recreo.jpg","descriptionESP":"Acrílico y esmalte sintético sobre tabla, 160x 120 cm, 2006","descriptionENG":"Acrylic and synthetic enamel on woodboard, 160x 120 cm","date":" 2006","thumb":"c16.jpg"},{"id":15,"alt":"Santiago","className":"","path":"k17.jpg","descriptionESP":"Esmalte sintético sobre tabla, 70x 32 cm, 2005","descriptionENG":"Synthetic enamel on woodboard, 70x 32 cm","date":" 2005","thumb":"c17.jpg"},{"id":14,"alt":"Murgartegui","className":"","path":"mugartegui.jpg","descriptionESP":"Esmalte sintético sobre tabla, 100x 160 cm, 2006","descriptionENG":"Synthetic enamel on woodboard, 100x 160 cm","date":" 2006","thumb":"c18.jpg"},{"id":13,"alt":"La charla","className":"","path":"the-chat.jpg","descriptionESP":"Acrílico sobre tela, 43x 58 cm, 2008","descriptionENG":"Acrylic on canvas, 43x 58 cm","date":" 2008","thumb":"c11.jpg"},{"id":12,"alt":"Autorretrato","className":"margin-mid","path":"selfportrait.jpg","descriptionESP":"Esmalte sintético sobre tabla, 60x 40 cm, 2006","descriptionENG":"Synthetic enamel on woodboard, 60x 40 cm","date":" 2006","thumb":"c6.jpg"},{"id":11,"alt":"Pilar","className":"","path":"pili.jpg","descriptionESP":"Esmalte sintético sobre tabla, 25x 33 cm, 2006","descriptionENG":"Synthetic enamel on woodboard, 25x 33 cm","date":" 2006","thumb":"c3.jpg"},{"id":10,"alt":"La estación","className":"","path":"k25.jpg","descriptionESP":"Esmalte sintético sobre tabla, 25x 33 cm, 2004","descriptionENG":"Synthetic enamel on woodboard, 25x 33 cm","date":" 2004","thumb":"c25.jpg"},{"id":9,"alt":"Encuentros","className":"","path":"k22.jpg","descriptionESP":"Esmalte sintético sobre tabla , 25x 33 cm, 2004","descriptionENG":"Synthetic enamel on woodboard, 25x 33 cm","date":" 2004","thumb":"c22.jpg"},{"id":8,"alt":"A Rúa","className":"","path":"rua.jpg","descriptionESP":"Esmalte sintético sobre tabla, 25x 33 cm, 2004","descriptionENG":"Synthetic enamel on woodboard, 25x 33 cm","date":" 2004","thumb":"c24.jpg"},{"id":7,"alt":"La playa","className":"","path":"k20.jpg","descriptionESP":"Esmalte sintético sobre tabla, 25x 33 cm, 2004","descriptionENG":"Synthetic enamel on woodboard, 25x 33 cm","date":" 2004","thumb":"c20.jpg"},{"id":6,"alt":"La playa II","className":"","path":"k21.jpg","descriptionESP":"Esmalte sintético sobre tabla, 100x 50 cm, 2005","descriptionENG":"Synthetic enamel on woodboard, 100x 50 cm","date":" 2004","thumb":"c21.jpg"},{"id":1,"alt":"Zu","className":"","path":"zu.jpg","descriptionESP":"Acrílico sobre tela, 27x 43 cm, 2009","descriptionENG":"Acrylic on canvas, 27x 43 cm","date":" 2009","thumb":"c7.jpg"}];
      self.folder = "images/gallery_pictures/colourfields_series/";
      // Painting.get().$promise.then(function(data){
      //   self.paintings = data.items;
      //   self.folder = data.folder;
      // });
    };
    function getMixTech() {
      self.paintings = [{"id":8,"alt":"Yoli","className":"","path":"yoli.jpg","descriptionESP":"Collage, 46x 61 cm, 2009","descriptionENG":"Collage, 46x 61 cm","date":" 2018","thumb":"TODO"},{"id":7,"alt":"Mira en ti","className":"","path":"k13.jpg","descriptionESP":"Acrílico sobre tela, 100x 100 cm, 2001","descriptionENG":"Acrylic on canvas, 100x 100 cm","date":" 2004","thumb":"c13.jpg"},{"id":6,"alt":"El tiempo II","className":"","path":"time.jpg","descriptionESP":"Collage sobre tabla, 46x 61 cm, 2010","descriptionENG":"Collage on woodboard, 46x 61 cm","date":" 2010","thumb":"p6.jpg"},{"id":5,"alt":"Donna I","className":"margin-mid","path":"Donna I.jpg","descriptionESP":"Collage sobre tabla, 30x 70 cm, 2011","descriptionENG":"Collage on woodboard, 30x 70 cm","date":" 2010","thumb":"p5.jpg"},{"id":4,"alt":"Las tres Marías","className":"","path":"p9.jpg","descriptionESP":"Collage sobre A4, 2007","descriptionENG":"Collage on A4","date":" 2007","thumb":"p9.jpg"},{"id":3,"alt":"Tu pensamiento te hace libre","className":"","path":"tu pensamiento te hace libre.jpg","descriptionESP":"Collage sobre A4, 2011","descriptionENG":"Collage on A4","date":" 2011","thumb":"p1.jpg"},{"id":2,"alt":"El hambre","className":"","path":"el hambre.jpg","descriptionESP":"Collage sobre A4, 2011","descriptionENG":"Collage on A4","date":" 2011","thumb":"p2.jpg"},{"id":1,"alt":"La espera","className":"","path":"la espera.jpg","descriptionESP":"Collage sobre A4, 2011","descriptionENG":"Collage on A4","date":" 2011","thumb":"p3.jpg"}];
      self.folder = "images/gallery_pictures/mix_tech/";
      // Mix.get().$promise.then(function(data){
      //   self.paintings = data.items;
      //   self.folder = data.folder;
      // });
    };
    function getWatercolor(){
      self.paintings = [{"id":9,"alt":"Dreams can come true","className":"","path":"Dreamscancometrue.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017","descriptionENG":"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2018","thumb":"TODO"},{"id":8,"alt":"Let me go","className":"","path":"Letmego.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017","descriptionENG":"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2018","thumb":"TODO"},{"id":7,"alt":"Willing","className":"","path":"willing.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017","descriptionENG":"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2018","thumb":"TODO"},{"id":6,"alt":"Purple hue","className":"","path":"purplehue.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017","descriptionENG":"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2018","thumb":"TODO"},{"id":5,"alt":"Can't breath","className":"margin-mid","path":"cantbreath.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017","descriptionENG":"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2018","thumb":"TODO"},{"id":4,"alt":"Gea","className":"","path":"bluewind.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, 21x 27 cm, 2017","descriptionENG":"Watercolour on 21x 27 cm Winsor & Newton watercolour paper 300gsm/140lb","date":" 2017","thumb":"zThumbbluewind.jpg"},{"id":3,"alt":"Akaki","className":"","path":"Akachi.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017","descriptionENG":"Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2017","thumb":"zThumbAkachi.jpg"},{"id":2,"alt":"Amanitas","className":"margin-mid","path":"amanitas.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A3, 2017","descriptionENG":"Watercolour on A3 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2017","thumb":"ZThumbamanitas.jpg"},{"id":1,"alt":"Colourfeelds","className":"","path":"splash.jpg","descriptionESP":"Acuarela sobre papel de acuarela Winsor & Newton 300gsm/140lb, A2, 2017","descriptionENG":"Watercolour on A2 Winsor & Newton watercolour paper 300gsm/140lb","date":" 2017","thumb":"zThumbsplash.jpg"}];
      self.folder = "images/gallery_pictures/watercolor/";
      // Watercolor.get().$promise.then(function(data){
      //   self.paintings = data.items;
      //   self.folder = data.folder;
      // });
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