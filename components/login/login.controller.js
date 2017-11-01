(function () {
  'use strict';

  angular.module('login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginService', '$rootScope', '$state'];
  function LoginController(LoginService, $rootScope, $state) {
    var ctrl = this;

    $rootScope.isLogged = true;

    ctrl.login = function () {
      console.log("Logging...");
      var user = {
        email: ctrl.email,
        password: ctrl.password
      };
      $rootScope.isLogged = true;
      $state.go("home");
      // LoginService.login(user).then(function (response) {
      //   console.log("Login successful");
      //
      // }, errorCallback);
    };

    ctrl.logout = function () {
      $rootScope.isLogged = false;
    }
  }


  function errorCallback(response) {
    console.log("error response:", response);
    ctrl.errorMessage = response.data;
  }

})();
