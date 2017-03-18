angular.module("adminApp", ["ngResource"]);
angular.module("adminApp").factory("Gallery", function($resource) {
    var TodoObject = $resource("/api/gallery/:id", {id: "@id"}, {
        "update": {method: "PUT"}
    });
    return TodoObject;
});

angular.module("adminApp").controller("adminCtrl", ["Gallery", function(Gallery){
  var self = this;
  this.message = "helloWordl";
  self.loggedIn = false;
  self.galSelect;
  self.selectedImage;
  self.images = [];
  self.delete = function (){
    Gallery.delete({id:self.galSelect+"/"+self.selectedImage}).$promise.then(function(data){
      console.log(data);
    }).catch(function(err){
      if(err){
        console.log(err)
      }
    });
    console.log(self.selectedImage);
    // console.log($event.target.imagename);
  };
  self.authenticate = function($event){
    console.log($event);
  };
  // ---------------------------------------------
  Gallery.get().$promise.then(function(data){
    console.log(data);
    self.galleries = data.item;
    for (var i in data.item){
      for(var j in data.item[i].items){
        self.images.push({folder:data.item[i].folder,src:data.item[i].items[j]});
      }
    }
    console.log(self.images);
  }).catch(function(err){
    if(err){
      console.log(err);
    }
  });
}]);
