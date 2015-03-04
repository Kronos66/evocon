(function ()
{
    'use strict';

    function StationsController($modal, $scope, StationsDAO, StationGroupDAO)
    {
        var ctrl = this;
        this.selected = null;
        var refresh = function ()
        {
            StationsDAO.query().then(function (result)
            {
                angular.forEach(result, function (station)
                {
                    station.enabled = station.enabled ? 'Yes' : 'No';
                });
                ctrl.data = result;

            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationsController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationsController.deleteRow(row.entity.stationId)">' +
                '{{\'delete\'|translate}}</a></span>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            data: 'stationsController.data',
            columnDefs: [{
                             field: 'id',
                             displayName: 'Station number'
                         },
                         {
                             field: 'name',
                             displayName: 'Name'
                         },
                         {
                             field: 'description',
                             displayName: 'Description'
                         },
                         {
                             field: 'stationGroup'
                         },
                         {
                             field: 'enabled',
                             displayName: 'Enabled'
                         },
                         {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column',
                             maxWidth: 120,
                             field: ' ',
                             cellTemplate: actionsTemplate,
                             enableSorting: false,
                             enableHiding: false
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (ctrl.selected !== row.entity.stationId) {
                    ctrl.selected = row.entity.stationId;
                    StationsDAO.get(row.entity.stationId).then(function (result)
                    {
                        ctrl.detailsStation = result;
                    });
                } else {
                    ctrl.detailsStation = null;
                    ctrl.selected = null;
                }
            });
        };
        this.addStation = function ()
        {
            var station = {};
            var modalInstance = $modal.open({
                controller: 'editOrCreateStationController',
                controllerAs: 'modal',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                templateUrl: 'admin/views/stations/editOrCreateModal.tpl.html',
                resolve: {
                    station: function ()
                    {
                        return station;
                    }
                }
            });
            modalInstance.result.then(StationsDAO.save).then(refresh);
        };
        this.addStationGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/stationGroup/editOrCreateModal.tpl.html', controller: 'addGroup', controllerAs: 'modal', resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(StationGroupDAO.save).then(refresh);

        };
        this.editRow = function (station)
        {
            var modalInstance = $modal.open({
                controller: 'editOrCreateStationController',
                controllerAs: 'modal',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                templateUrl: 'admin/views/stations/editOrCreateModal.tpl.html',
                resolve: {
                    station: function ()
                    {
                        return angular.extend({}, station);
                    }
                }
            });
            modalInstance.result.then(StationsDAO.update).then(refresh);
        };
        this.deleteRow = function (stationId)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html', backdrop: 'static', keyboard: false
            });
            modalInstance.result.then(function ()
            {
                StationsDAO.remove(stationId).then(refresh);
            });
        };
        refresh();
    }

    angular.module('evoReports').controller('stationsController', ['$modal', '$scope', 'StationsDAO', 'StationGroupDAO', StationsController]);
})();
