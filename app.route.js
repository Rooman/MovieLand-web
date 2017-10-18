(function () {
  'use strict';

  angular.module('MovieLand')
    .config(RoutesConfig)
  ;

  function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/components/home/home.html'
      })

      .state('movie', {
        url: '/movie/{id}',
        templateUrl: '/components/movie/movie.html',
        controller: 'MovieController',
        controllerAs: 'movieCtrl',
        resolve: {
          movie: ['$stateParams', 'CommonService', function ($stateParams, CommonService) {
            return CommonService.getMovieById($stateParams.id);
          }]
        }
      })

      .state('login', {
        url: '/login',
        template: '<login></login>'
      });
    //
    //     // .state('moviesByGenre', {
    //     //   url: '/movies?genre=:genreId',
    //     //   template: '<movie-list></movie-list>'
    //     // })
    //     //

    //     //
    //     // .state('review', {
    //     //   url: '/review?review=:reviewId',
    //     //   template: '<review reviews="ctrl.movie.reviews"></review>'
    //     // })
    //   ;
    //
  }

})();
