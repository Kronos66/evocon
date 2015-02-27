(function ()
{
    'use strict';
    function DefectsController($modal, DefectsDAO, DefectsGroupDAO)
    {
        var actionsTemplate = '<a class="button link" ng-click="grid.appScope.defectsCtrl.editRow(row.entity)">{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.defectsCtrl.deleteRow(row.entity.id)">{{\'delete\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.defectsCtrl.stationRow(row.entity.id)">{{\'stations\'|translate}}</a>';
        var ctrl = this;
        var refresh = function ()
        {
            DefectsDAO.query().then(function (result)
            {
                ctrl.defects = result;
            });
        };
        this.gridOptions = {
            enableRowHashing: false,
            data: 'defectsCtrl.defects',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableRowHeaderSelection: false,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'groupId', displayName: 'Group'
                         }, {
                             field: 'stationId', displayName: 'Station'
                         }, {
                             field: 'createdDate', displayName: 'Created'
                         }, {
                             width: 280, minWidth: 300, displayName: 'Actions', field: 'remove', cellTemplate: actionsTemplate
                         }]
        };
        this.newGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defectsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });

            modalInstance.result.then(DefectsGroupDAO.save).then(refresh);
        };
        this.deleteRow = function (id)
        {
            DefectsDAO.remove(id).then(refresh);
        };
        this.addRow = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalDefectsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(DefectsDAO.save).then(refresh);
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalDefectsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });

            modalInstance.result.then(DefectsDAO.update).then(refresh);
        };
        this.mergeDefects = function ()
        {
            var modalInstance = $modal.open({
                size: 'lg',
                templateUrl: 'admin/views/defects/mergeModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalMergeDefectsDefects',
                controllerAs: 'modal'
            });
            modalInstance.result.then(DefectsDAO.merge).then(refresh);
        };
        this.stationRow = function ()
        {

        };
        refresh();
    }

    angular.module('evoReports').controller('defectsController', ['$modal', 'DefectsDAO', 'DefectsGroupDAO', DefectsController]);
})();