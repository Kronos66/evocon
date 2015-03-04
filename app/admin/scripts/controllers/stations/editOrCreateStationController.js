(function ()
{
    'use strict';
    function EditOrCreateStationController(station)
    {
        station.enabled = (station.enabled === 'Yes');
        this.row = station;
    }

    angular.module('evoReports').controller('editOrCreateStationController', ['station', EditOrCreateStationController])
})();