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
          }],
          userRating: ['$stateParams', 'CommonService', function ($stateParams, CommonService) {
            return CommonService.getOwnMovieRating($stateParams.id);
          }]
        }
      })

      .state('login', {
        url: '/login',
        template: '<login></login>'
      })

      .state('importExport', {
        url: '/importExport',
        controller: 'ImportExportController',
        controllerAs: 'ctrl',
        templateUrl: '/components/import-export/import-export.html'
      })

      .state('addMovie', {
        url: '/addMovie',
        controller: 'AddMovieController',
        controllerAs: 'ctrl',
        templateUrl: '/components/add-movie/add-movie.html'
      });
  }

})();
