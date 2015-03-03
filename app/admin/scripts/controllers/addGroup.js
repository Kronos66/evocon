/*globals moment*/
(function ()
{
    'use strict';
    function ModalController(row)
    {
        var ctrl = this;
        ctrl.row = row;
    }

    angular.module('evoReports').controller('addGroup', ['row', ModalController]);
})();
