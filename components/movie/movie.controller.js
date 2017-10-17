(function () {
  'use strict';

  angular.module('movie')
    .controller('MovieController', MovieController)
  ;

  MovieController.$inject = ['movie'];
  function MovieController(movie) {
    var ctrl = this;
    ctrl.movie = movie.data;
  }

})();
