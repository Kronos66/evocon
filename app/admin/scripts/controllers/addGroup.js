/*globals moment*/
(function ()
{
    'use strict';
    function ModalController(row)
    {
        var ctrl = this;
        ctrl.row = row;
        if (ctrl.row && ctrl.row.startTime && ctrl.row.endTime) {
            ctrl.row.startTime = moment('1970-1-1 ' + ctrl.row.startTime).format();
            ctrl.row.endTime = moment('1970-1-1 ' + ctrl.row.endTime).format();
        }
    }

    angular.module('evoReports').controller('addGroup', ['row', ModalController]);
})();
