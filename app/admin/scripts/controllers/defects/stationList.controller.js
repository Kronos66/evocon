(function ()
{
    'use strict';
    function StationListController($scope, StationsDAO)
    {
        var ctrl = this;
        ctrl.addStations = [];
        StationsDAO.query().then(function (result)
        {
            ctrl.listStations = result;
        });
        this.gridOptions = {
            enableRowSelection: true,
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            data: 'modal.listStations',
            columnDefs: [{
                             field: 'stationId', displayName: 'ID'
                         }, {
                             field: 'name', displayName: 'Name'
                         }, {
                             headerCellClass: 'last-column-modal',
                             field: 'description', displayName: 'Description'
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                var indexOf = ctrl.addStations.indexOf(row.entity);
                if (-1 === indexOf) {
                    ctrl.addStations.push(row.entity);
                } else {
                    ctrl.addStations.splice(indexOf, 1);
                }
            });
        };
    }

    angular.module('evoReports').controller('stationListController', ['$scope', 'StationsDAO', StationListController]);
})();