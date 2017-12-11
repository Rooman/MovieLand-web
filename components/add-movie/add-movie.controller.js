(function () {
  'use strict';

  angular.module('addMovie')
    .controller('AddMovieController', AddMovieController);

  AddMovieController.$inject = ['CommonService'];
  function AddMovieController(CommonService) {
    var ctrl = this;
    ctrl.movie = {};
    ctrl.movie.countries = [];
    ctrl.movie.genres = [];

    CommonService.getGenres().then(function (response) {
      console.log("genre list response data", response.data);
      ctrl.availableGenres = response.data
    }, errorCallback);

    CommonService.getCountries().then(function (response) {
      console.log("contry list response data", response.data);
      ctrl.availableCountries = response.data
    }, errorCallback);

    function errorCallback(response) {
      console.log("error response", response);
      alert("error!!!" + response.data);
    }

    ctrl.addMovie = function () {
      console.log("movie to add", ctrl.movie);
      CommonService.addMovie(ctrl.movie).then(function (response) {
        alert("Movie added :)");
        ctrl.movie = {};
      }, errorCallback);

    }
  }
})();
