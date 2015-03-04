(function ()
{
    'use strict';
    function ProductsGroupController($modal, $scope, ProductsGroupDAO)
    {
        var ctrl = this;

        this.group = null;
        this.resultCount = null;

        var selectedGroup;

        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.edit(row.entity)">{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.delete(row.entity.id)">{{\'delete\'|translate}}</a></span>';


        this.gridOptionsGroups = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            data: 'groupCtrl.group',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [
                {
                    field:'name', displayName:'Name', cellClass: 'special-cell'
                },
                {
                    headerCellClass: 'smallActionsWidthHeader',
                    cellClass: 'smallActionsWidth actionsDivToRight',
                    maxWidth: 120, field: ' ', cellTemplate: actionsTemplate
                }
            ]
        };

        this.gridOptionsGroups.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (selectedGroup !== row.entity.id) {
                    selectedGroup = row.entity.id;
                    ProductsGroupDAO.getProducts(row.entity.id).then(function (result)
                    {
                        ctrl.visible = true;
                        ctrl.productsInGroup = result;
                    });
                } else {
                    ctrl.visible = false;
                    selectedGroup = '';
                }
            });
        };

        this.gridOptionsProducts = {
            data: 'groupCtrl.productsInGroup',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [
                {field:'name', displayName:'Name'},
                {field:'barcode', displayName:'Barcode'},
                {field:'enabled', displayName:'Enabled'},
                {field:'groupId', displayName:'Group'}
            ]
        };

        this.newGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/productsGroup/editOrCreateModal.tpl.html',
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
            modalInstance.result.then(ProductsGroupDAO.save).then(refresh);
        };

        this.edit = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/productsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({},row);
                    }
                }
            });
            modalInstance.result.then(ProductsGroupDAO.update).then(refresh);
        };

        this.delete = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function ()
            {
                ProductsGroupDAO.remove(id).then(refresh);
            });
        };

        var refresh = function ()
        {
            ProductsGroupDAO.query().then(function (result)
            {
                ctrl.group = result;
                ctrl.resultCount = result.length;
            });
        };

        refresh();
    }

    angular.module('evoReports').controller('ProductsGroupController', ['$modal', '$scope', 'ProductsGroupDAO', ProductsGroupController]);
})();
