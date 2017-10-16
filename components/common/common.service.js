(function () {
  'use strict';

  angular.module('common')
    .service('CommonService', CommonService);


  // TODO: add prefix
  CommonService.$inject = ['$http'];
  function CommonService($http) {
    var service = this;

    service.getMovies = function () {
      return $http({
        method: "GET",
        url: ("http://localhost:8080/v1/movie")
      });
    };

    service.getRandomMovies = function () {
      return $http({
        method: "GET",
        url: ("http://localhost:8080/v1/movie/random")
      });
    };


    // service.getMoviesByGenre = function (genreId) {
    //   return $http({
    //     method: "GET",
    //     url: ("/movies"),
    //     params: {
    //       genre: genreId
    //     }
    //   });
    // };

    service.getGenres = function () {
      return $http({
        method: "GET",
        url: ("http://localhost:8080/v1/genre")
      });
    };
  }

})();
//   service.getMovieById = function (movieId) {
//     return $http({
//       method: "GET",
//       url: ("/movie"),
//       params: {
//         movie: movieId
//       }
//     });
//   };
//
//   service.addReview = function (review) {
//     console.log("Review in the POST", review);
//     console.log("ToJson", JSON.stringify({'review': review}));
//     return $http({
//       method: "POST",
//       url: ("/review"),
//       data: JSON.stringify({'description': review.description, 'movie': review.movie, 'user': review.user}),
//       headers: {'Content-Type': 'application/json'}
//     });
//   };
//
//   service.removeReview = function (reviewId) {
//     console.log("Review id for removal: ", reviewId);
//     console.log("ToJson", JSON.stringify({'id': reviewId}));
//     return $http({
//       method: "DELETE",
//       url: ("/review"),
//       data: JSON.stringify({'id': reviewId}),
//       headers: {'Content-Type': 'application/json'}
//     });
//   };
//
//   service.getReviewById = function (reviewId) {
//     return $http({
//       method: "GET",
//       url: ("/review"),
//       params: {
//         review: reviewId
//       }
//     });
//   };
//
//   service.putReview = function (review) {
//     console.log("Review in the PUT", review);
//     console.log("ToJson", JSON.stringify({
//       'description': review.description,
//       'user': review.user,
//       'id': review.id,
//       'movie': review.movie
//     }));
//     return $http({
//       method: "PUT",
//       url: ("/review"),
//       data: JSON.stringify({
//         'description': review.description,
//         'user': review.user,
//         'id': review.id,
//         'movie': review.movie
//       }),
//       headers: {'Content-Type': 'application/json'}
//     });
//   }
// }



