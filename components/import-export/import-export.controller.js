(function () {
  'use strict';

  angular.module('importExport')
    .controller('ImportExportController', ImportExportController);

  ImportExportController.$inject = ['CommonService'];
  function ImportExportController(CommonService) {
    var ctrl = this;
    ctrl.data = "";


  }
})();
