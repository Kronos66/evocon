(function ()
{
    'use strict';
    function EditOrCreateStationController(station)
    {
        this.row = station;
    }

    angular.module('evoReports').controller('editOrCreateStationController', ['station', EditOrCreateStationController])
})();