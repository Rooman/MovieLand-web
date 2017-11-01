(function () {
  'use strict';

  angular.module('movie')
    .controller('MovieController', MovieController)
  ;

  MovieController.$inject = ['movie', 'CommonService'];
  function MovieController(movie, CommonService) {
    var ctrl = this;
    ctrl.movie = movie.data;


    ctrl.editModeOn = function () {
      ctrl.editMode = true;
      var movieToEdit = ctrl.movie;
      ctrl.editMovie = {
        "id": movieToEdit.id,
        "nameRussian": movieToEdit.nameRussian,
        "nameNative": movieToEdit.nameNative,
        "yearOfRelease": movieToEdit.yearOfRelease,
        "description": movieToEdit.description,
        "price": movieToEdit.price,
        "picturePath": movieToEdit.picturePath,
        "countries": copyInnerArray(movieToEdit.countries),
        "genres": copyInnerArray(movieToEdit.genres)
      }

    };

    ctrl.isCheckedGenre = function (genreId) {
      var genres = ctrl.editMovie.genres;
      for (var i = 0; i < genres.length; i++) {
        var genre = genres[i];
        if (genre.id == genreId) {
          return true;
        }
      }
      return false;
    };

    ctrl.isCheckedCountry = function (countryId) {
      var countries = ctrl.editMovie.countries;
      for (var i = 0; i < countries.length; i++) {
        var country = countries[i];
        if (country.id == countryId) {
          return true;
        }
      }
      return false;
    };



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
    }


    function copyInnerArray(arrayToCopy) {
      var copy = [];
      for (var i = 0; i < arrayToCopy.length; i++) {
        var item = arrayToCopy[i];
        copy.push({
          id: item.id,
          name: item.name
        })
      }
      return copy;
    }

    ctrl.saveEditChanges = function () {
      ctrl.editModeOff();
    };

    ctrl.editModeOff = function () {
      ctrl.editMode = false;
    };
  }

})();
