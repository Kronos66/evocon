(function ()
{
    'use strict';
    function EditOrCreateStationController(station, StationGroupDAO)
    {
        station.enabled = (station.enabled === 'Yes');
        var ctrl = this;
        this.row = station;
        StationGroupDAO.query().then(function (result)
        {
            ctrl.stationGroups = result;
        });
        this.selectedGroup = function (id)
        {
            //console.log(id, station);
            //console.log(id === parseInt(station.stationGroup));
            return id === parseInt(station.stationGroup);
        };
        this.select2Options = {
            allowClear: true, multiple: false, minimumInputLength: 1, maximumInputLength: 10, initSelection: function ()
            {

            }
        };
    }

    angular.module('evoReports').controller('editOrCreateStationController', ['station', 'StationGroupDAO', EditOrCreateStationController])
})();