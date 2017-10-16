(function () {
  'use strict';

  angular.module('movieCarousel')
    .component('movieCarousel', {
      templateUrl: '/components/movie-carousel/movieCarousel.html',
      controller: 'MovieCarouselController as ctrl'
    });

})();
