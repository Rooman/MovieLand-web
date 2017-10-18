(function () {
  'use strict';

  angular.module('common')
    .service('LoginService', LoginService);


  LoginService.$inject = ['$http'];
  function LoginService($http) {
    var service = this;

    service.login = function (user) {
      return $http({
        method: "POST",
        url: ("http://localhost:8080/v1/login"),
        data: {email: user.email, password: user.password}
      });
    };
  }

})();




