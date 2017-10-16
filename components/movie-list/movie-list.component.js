(function () {
  'use strict';

  angular.module('movieList')
    .component('movieList', {
      templateUrl: 'components/movie-list/movie-list.html',
      controller: 'MovieListController as ctrl'
    })
  ;

})();
