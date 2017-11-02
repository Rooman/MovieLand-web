(function () {
  'use strict';

  angular.module('login')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['LoginService', '$rootScope', '$state'];
  function LoginController(LoginService, $rootScope, $state) {
    var ctrl = this;

    ctrl.user = {};

    ctrl.login = function () {
      console.log("Logging...");


      LoginService.login(ctrl.user).then(function (response) {
        console.log("Login successful", response.data);
        $rootScope.isLogged = true;
        $rootScope.user = response.data;
        $state.go("home");
      }, errorCallback);
    };

    ctrl.logout = function () {
      $rootScope.isLogged = false;
      $rootScope.user = null;
    };
    function errorCallback(response) {
      console.log("error response:", response);
      ctrl.errorMessage = "Status code: " + response.status + ", response: " + response.data;
    }
  }


})();
