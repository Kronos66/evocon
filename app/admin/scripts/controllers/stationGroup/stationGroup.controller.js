(function ()
{
    'use strict';
    function StationGroupController($modal, $scope, StationGroupDAO)
    {
        var ctrl = this;
        var selectedGroup;
        var refresh = function ()
        {
            StationGroupDAO.query().then(function (result)
            {
                ctrl.stationGroups = result;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationGroupController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationGroupController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            data: 'stationGroupController.stationGroups',
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'description', displayName: 'Description'
                         }, {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column',
                             maxWidth: 120, field: ' ', displayName: '', cellTemplate: actionsTemplate, enableSorting: false, enableHiding: false
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (selectedGroup !== row.entity.id) {
                    selectedGroup = row.entity.id;
                    StationGroupDAO.get(row.entity.id).then(function (result)
                    {
                        ctrl.visibled = true;
                        ctrl.station = result;
                    });
                } else {
                    ctrl.visibled = false;
                    selectedGroup = '';
                }
            });
        };
        this.gridOptions2 = {
            data: 'stationGroupController.station',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/stationGroup/editOrCreateModal.tpl.html',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });
            modalInstance.result.then(StationGroupDAO.update).then(refresh);
        };
        this.deleteRow = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function ()
            {
                StationGroupDAO.remove(id).then(refresh);
            });
        };
        this.addStation = function ()
        {
            var row;
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/stationGroup/editOrCreateModal.tpl.html',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(StationGroupDAO.save).then(refresh);
        };
        refresh();
    }

    angular.module('evoReports').controller('stationGroupController', ['$modal', '$scope', 'StationGroupDAO', StationGroupController]);
})();