angular.module("navApp", []);

angular.module("navApp").controller("navCtrl", ["$scope", function(scope) {
 var self = this;
 self.languageObj = {
   value: "ENG"
 };
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

  self.menu = self.menuENG;
  self.setLangESP = function(){
    console.log("changed");
    self.languageObj.value = "ESP";
    self.menu = self.menuESP;
  }
  self.setLangENG = function(){
    console.log("changed");
    self.languageObj.value = "ENG";
    self.menu = self.menuENG;
  }
}]);
