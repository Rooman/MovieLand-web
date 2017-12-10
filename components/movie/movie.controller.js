(function () {
  'use strict';

  angular.module('movie')
    .controller('MovieController', MovieController)
  ;

  MovieController.$inject = ['movie', 'CommonService', '$rootScope', 'userRating'];
  function MovieController(movie, CommonService, $rootScope, userRating) {
    var ctrl = this;
    ctrl.movie = movie.data;
    ctrl.currencySign = '₴';
    ctrl.selectedCurrency = "UAH";
    console.log("userRating", userRating);

    if ($rootScope.user === undefined) {
      ctrl.userRating = "login to vote";
    } else if (userRating.data === "") {
      ctrl.userRating = "not voted yet";
    } else {
      ctrl.userRating = userRating.data;
    }


    ctrl.updateCurrency = function () {
      var selectedCurrency = ctrl.selectedCurrency;
      if (selectedCurrency === "UAH") {
        CommonService.getMovieById(ctrl.movie.id).then(function (response) {
          console.log("movie response data", response.data);
          ctrl.movie = response.data
          ctrl.currencySign = '₴';
        }, errorCallback);

      } else {
        CommonService.getMovieWithCurrency(ctrl.movie.id, selectedCurrency).then(function (response) {
          console.log("movie response data", response.data);
          ctrl.movie = response.data;
          if (selectedCurrency === "USD") {
            ctrl.currencySign = '$';
          } else {
            ctrl.currencySign = '€';
          }
        }, errorCallback);
      }
    };


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

    ctrl.rate = function () {
      if (ctrl.selected !== undefined) {
        CommonService.rateMovie(ctrl.movie.id, ctrl.selected).then(function (response) {
          ctrl.userRating = ctrl.selected;
        }, errorCallback);
      }
    };

    ctrl.saveEditChanges = function () {
      ctrl.editModeOff();
    };

    ctrl.editModeOff = function () {
      ctrl.editMode = false;
    };

    ctrl.addReview = function () {
      var review = {
        text: ctrl.newReview,
        movieId: ctrl.movie.id
      };

      CommonService.addReview(review).then(function (response) {
        ctrl.newReview = "";
        review["user"] = $rootScope.user;
        console.log("review", review);
        ctrl.movie.reviews.push(response.data);
      }, errorCallback);

    };

    ctrl.removeReview = function (reviewId) {
      CommonService.removeReview(reviewId).then(function (response) {
        console.log("removing review with response: ", response.data);
        var myArray = ctrl.movie.reviews;
        for (var i = myArray.length - 1; i >= 0; --i) {
          if (myArray[i].id === reviewId) {
            myArray.splice(i, 1);
            console.log(myArray);
            break;
          }
        }
      }, errorCallback);

    };
  }

})();
