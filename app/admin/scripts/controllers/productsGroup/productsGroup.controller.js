(function ()
{
    'use strict';
    function ProductsGroupController($modal, $scope, ProductsGroupDAO)
    {
        var ctrl = this;

        this.group = null;
        this.resultCount = null;
        var selectedGroup;

        var pageGroup = 0;
        var pageUpGroup = 0;

        var pageProduct = 0;
        var pageUpProduct = 0;
        var refresh = function ()
        {
            ProductsGroupDAO.query().then(function (result)
            {
                ctrl.gridOptionsGroups.data = getData(result, pageGroup);
                ++pageGroup;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.edit(row.entity)">{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.delete(row.entity.id)">{{\'delete\'|translate}}</a></span>';
        var getData = function (data, page)
        {
            var res = [];
            for (var i = (page * 20); i < (page + 1) * 20 && i < data.length; ++i) {
                res.push(data[i]);
            }
            return res;
        };

        var getDataUp = function (data, page)
        {
            var res = [];
            for (var i = data.length - (page * 20) - 1; (data.length - i) < ((page + 1) * 20) && (data.length - i) > 0; --i) {
                if (data[i]) {
                    res.push(data[i]);
                }
            }
            return res;
        };
        this.gridOptionsGroups = {
            infiniteScrollPercentage: 10,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [{
                             field: 'name',
                             displayName: 'Name'
                         },
                         {
                             enableSorting: false,
                             enableHiding: false,
                             headerCellClass: 'actions-header two-columns',
                             cellClass: 'actions-column',
                             maxWidth: 120,
                             field: ' ',
                             cellTemplate: actionsTemplate
                         }]
        };

        this.gridOptionsGroups.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (selectedGroup !== row.entity.id) {
                    selectedGroup = row.entity.id;
                    pageProduct = 0;
                    pageUpProduct = 0;
                    ProductsGroupDAO.getProducts(row.entity.id).then(function (result)
                    {
                        ctrl.gridOptionsProducts.data = getData(result, pageGroup);
                        ++pageProduct;
                        ctrl.visible = true;
                    });
                } else {
                    ctrl.visible = false;
                    selectedGroup = '';
                }
            });
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                ProductsGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptionsGroups.data = ctrl.gridOptionsGroups.data.concat(getData(result, pageGroup));
                    ++pageGroup;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                ProductsGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptionsGroups.data = getDataUp(result, pageUpGroup).reverse().concat(ctrl.gridOptionsGroups.data);
                    ++pageUpGroup;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };

        this.gridOptionsProducts = {
            columnDefs: [{field: 'name', displayName: 'Name'}, {field: 'barcode', displayName: 'Barcode'}, {field: 'enabled', displayName: 'Enabled'}, {
                field: 'groupId', displayName: 'Group', headerCellClass: 'actions-header', cellClass: 'actions-column'
            }]
        };
        this.gridOptionsProducts.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                ProductsGroupDAO.getProducts(selectedGroup).then(function (result)
                {
                    ctrl.gridOptionsProducts.data = ctrl.gridOptionsProducts.data.concat(getData(result, pageProduct));
                    ++pageProduct;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                ProductsGroupDAO.getProducts(selectedGroup).then(function (result)
                {
                    ctrl.gridOptionsProducts.data = getDataUp(result, pageUpProduct).reverse().concat(ctrl.gridOptionsProducts.data);
                    ++pageUpProduct;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
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
                        return angular.extend({}, row);
                    }
                }
            });
            modalInstance.result.then(ProductsGroupDAO.update).then(refresh);
        };

        this.delete = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html', backdrop: 'static', keyboard: false
            });
            modalInstance.result.then(function ()
            {
                ProductsGroupDAO.remove(id).then(refresh);
            });
        };
        refresh();
    }

    angular.module('evoReports').controller('ProductsGroupController', ['$modal', '$scope', 'ProductsGroupDAO', ProductsGroupController]);
})();
