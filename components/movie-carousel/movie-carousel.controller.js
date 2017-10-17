(function () {
  'use strict';

  angular.module('movieCarousel')
    .controller('MovieCarouselController', MovieCarouselController)
  ;

  MovieCarouselController.$inject = ['CommonService'];
  function MovieCarouselController(CommonService) {
    var ctrl = this;

    CommonService.getRandomMovies().then(function (response) {
      console.log("random movies response data", response.data);
      ctrl.randomMovies = response.data
    }, errorCallback);

    function errorCallback(response) {
      console.log("error response", response);
    }

    ctrl.minDescription = function (text) {
      var length = text.trim().length;
      if (length > 350) {
        return text.substr(0, 350) + '...';
      }
      return text;
    }
  }

})();
