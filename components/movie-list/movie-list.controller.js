(function () {
  'use strict';

  angular.module('movieList')
    .controller('MovieListController', MovieListController)
  ;

  MovieListController.$inject = ['CommonService'];
  function MovieListController(CommonService) {
    var ctrl = this;

    ctrl.showMoviesByGenre = function (genreId) {
      CommonService.getMoviesByGenreId(genreId).then(function (response) {
        ctrl.choosedGenre = genreId;
        console.log("genre list response data", response.data);
        ctrl.movies = response.data
      }, errorCallback);
    };

    CommonService.getGenres().then(function (response) {
      console.log("genre list response data", response.data);
      ctrl.genres = response.data
    }, errorCallback);

    ctrl.getAllMovies = function () {
      CommonService.getMovies().then(function (response) {
        ctrl.choosedGenre = undefined;
        console.log("movie list response data", response.data);
        ctrl.movies = response.data
      }, errorCallback);
    };

    ctrl.sortMovies = function () {
      var sortType = ctrl.selectedItem;

      if (ctrl.choosedGenre) {
        CommonService.getMoviesByGenreIdWithSort(ctrl.choosedGenre, sortType).then(function (response) {
          console.log("movie list response data", response.data);
          ctrl.movies = response.data
        }, errorCallback);
      } else {
        CommonService.getMoviesWithSort(sortType).then(function (response) {
          console.log("movie list response data", response.data);
          ctrl.movies = response.data
        }, errorCallback);
      }

    };


    function errorCallback(response) {
      console.log("error response", response);
    }

    ctrl.getAllMovies();
  }
})
();
