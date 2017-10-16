(function () {
  'use strict';

  angular.module('movieCarousel')
    .controller('MovieCarouselController', MovieCarouselController)
  ;

  MovieCarouselController.$inject = ['CommonService'];
  function MovieCarouselController(CommonService) {
    console.log("in carousel");
    var ctrl = this;

    CommonService.getRandomMovies().then(function (response) {
      console.log("random movies response data", response.data);
      ctrl.randomMovies = response.data
    }, errorCallback);

    function errorCallback(response) {
      console.log("error response", response);
    }
  }

})();
