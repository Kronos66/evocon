(function ()
{
  'use strict';
  function ModalController(row)
  {
    this.row={};
    var ctrl = this;
    angular.extend(ctrl.row, row);
  }

  angular.module('evoconApp').controller('modalController', ['row', ModalController]);

})();
