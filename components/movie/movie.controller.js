(function () {
  'use strict';

  angular.module('movie')
    .controller('MovieController', MovieController)
  ;

  MovieController.$inject = ['movie', 'CommonService', '$rootScope', 'userRating'];
  function MovieController(movie, CommonService, $rootScope, userRating) {
    var ctrl = this;
    ctrl.movie = movie.data;
    console.log("movie", ctrl.movie);
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
      };
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
        copy.push(
          "" + item.id
        )
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
      console.log("old movie", ctrl.movie);
      console.log("new movie", ctrl.editMovie);
      var mergedMovie = {};
      if (ctrl.movie.nameRussian !== ctrl.editMovie.nameRussian) {
        mergedMovie.nameRussian = ctrl.editMovie.nameRussian;
      }
      if (ctrl.movie.nameNative !== ctrl.editMovie.nameNative) {
        mergedMovie.nameNative = ctrl.editMovie.nameNative;
      }
      if (ctrl.movie.yearOfRelease !== ctrl.editMovie.yearOfRelease) {
        mergedMovie.yearOfRelease = ctrl.editMovie.yearOfRelease;
      }
      if (ctrl.movie.description !== ctrl.editMovie.description) {
        mergedMovie.description = ctrl.editMovie.description;
      }
      if (ctrl.movie.price !== ctrl.editMovie.price) {
        mergedMovie.price = ctrl.editMovie.price;
      }
      if (ctrl.movie.picturePath !== ctrl.editMovie.picturePath) {
        mergedMovie.picturePath = ctrl.editMovie.picturePath;
      }
      mergedMovie.countries = ctrl.editMovie.countries;
      mergedMovie.genres = ctrl.editMovie.genres;

      console.log("merged movie", mergedMovie);

      CommonService.updateMovie(ctrl.movie.id, mergedMovie).then(function (response) {
        ctrl.editModeOff();
        alert("movie edited!");
        ctrl.updateCurrency();
      }, function (error) {
        console.log(error);
        alert("Error");
      });
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
