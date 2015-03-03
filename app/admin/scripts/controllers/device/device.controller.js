(function ()
{
    'use strict';
    angular.module('evoReports').controller('deviceController', ['$modal', 'deviceDAO', function ($modal, deviceDAO)
    {

        var ctrl = this,
            refresh = function () {
                deviceDAO.query().then(function (data) {
                    console.log( data );
                    ctrl.gridOptions.data = data;
                });
            };

        ctrl.gridOptions = {
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                    field: 'id',
                    displayName: 'Id'
                },{
                    field: 'inputs',
                    displayName: 'Inputs'
                },
                {
                    field: 'description',
                    displayName: 'Description'
                },
                {
                    maxWidth: 120,
                    field: ' ',
                    cellTemplate: '<span class="buttonActions">' +
                    '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.devCtrl.editDev( row.entity )">' +
                    '{{\'edit\'|translate}}</a>' +
                    '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.devCtrl.deleteDev( row.entity.id )">' +
                    '{{\'delete\'|translate}}</a>' +
                    '</span>'
                }]
        };

        ctrl.newDev = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/device/addOrEditModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                size: 'md',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(deviceDAO.save).then(refresh);
        };

        ctrl.editDev = function (entity)
        {
            var row = angular.extend({}, entity);
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/device/addOrEditModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                size: 'md',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(deviceDAO.update).then(refresh);
        };

        ctrl.deleteDev = function (entity)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function ()
            {
                deviceDAO.remove(entity).then(refresh);
            });
        };

        refresh();

    }]);
})();
