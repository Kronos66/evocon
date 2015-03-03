(function ()
{
    'use strict';

    function StationsController($modal, $scope, StationsDAO)
    {
        var ctrl = this;
        this.selected = null;
        var refresh = function ()
        {
            StationsDAO.query().then(function (result)
            {
                ctrl.data = result;

            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationsController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationsController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            data: [{id: 2, name: 'mockInController'}, {id: 5, name: 'mock'}],//'stationsController.data'
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'description', displayName: 'Description'
                         }, {
                             displayName: '', field: 'remove', cellTemplate: actionsTemplate
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (ctrl.selected !== row.entity.id) {
                    ctrl.selected = row.entity.id;
                    StationsDAO.get(row.entity.id).then(function (result)
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
            var station={};
            var modalInstance=$modal.open({
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
        this.editRow = function (station)
        {
            var modalInstance=$modal.open({
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
        this.deleteRow = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function ()
            {
                StationsDAO.remove(id).then(refresh);
            });
        };
        refresh();
    }

    angular.module('evoReports').controller('stationsController', ['$modal', '$scope', 'StationsDAO', StationsController]);
})();
