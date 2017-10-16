(function () {
  'use strict';

  angular.module('movieCarousel')
    .component('movieCarousel', {
      templateUrl: '/components/movie-carousel/movie-carousel.html',
      controller: 'MovieCarouselController as ctrl'
    });

})();
