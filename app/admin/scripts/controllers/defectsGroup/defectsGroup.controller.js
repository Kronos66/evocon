(function ()
{
    'use strict';

    function DefectsGroupController($modal, $scope, DefectsDAO, DefectsGroupDAO)
    {
        var ctrl = this;
        var selectedGroup;
        var refresh = function ()
        {
            DefectsGroupDAO.query().then(function (result)
            {
                ctrl.defectsGroup = result;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';

        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            data: 'groupCtrl.defectsGroup',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                            maxWidth: 120, field: ' ', cellTemplate: actionsTemplate
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (selectedGroup !== row.entity.id) {
                    selectedGroup = row.entity.id;
                    DefectsGroupDAO.getDefects(row.entity.id).then(function (result)
                    {
                        ctrl.visibled = true;
                        ctrl.defectsInGroup = result;
                    });
                } else {
                    ctrl.visibled = false;
                    selectedGroup = '';
                }
            });
        };
        this.gridOptions2 = {
            enableRowHeaderSelection: false,
            enableRowSelection: false,
            multiSelect: false,
            data: 'groupCtrl.defectsInGroup',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'groupId', displayName: 'Group'
                         }, {
                             field: 'stationId', displayName: 'Station'
                         }, {
                             field: 'createdDate', displayName: 'Created'
                         }]
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defectsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });
            modalInstance.result.then(DefectsGroupDAO.update).then(refresh);
        };
        this.addRow = function ()
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
        this.newDefect = function ()
        {
            var row = {groupId: selectedGroup};
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
        this.deleteRow = function (id)
        {
            DefectsGroupDAO.remove(id).then(refresh);
        };
        refresh();

    }

    angular.module('evoReports').controller('defectsGroupController', ['$modal', '$scope', 'DefectsDAO', 'DefectsGroupDAO', DefectsGroupController]);
})();