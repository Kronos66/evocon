(function ()
{
    'use strict';
    function ProductsController($modal, $scope, ProductsDAO, ProductsGroupDAO)
    {
        var ctrl = this;
        var page = 0;
        var pageUp = 0;
        var refresh = function ()
        {
            page = 0;
            pageUp = 0;
            var data = [];
            ProductsDAO.query().then(function (result)
            {
                angular.forEach(result, function (product)
                {
                    product.enabled = product.enable ? 'Yes' : 'No';
                });
                data = result;
                ctrl.resultCount = result.length;
                return ProductsGroupDAO.query();
            }).then(function (result)
            {
                data = data.map(function (element)
                {
                    for (var i = 0; i < result.length; i++) {
                        if (element.groupId === result[i].id) {
                            element.nameGroup = result[i].name;
                        }
                    }
                    return element;
                });
                ctrl.gridOptions.data = getData(data, page);
                ++page;
            });
        };

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
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-href="#/product/{{row.entity.id}}">{{ \'edit\' | translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.productsCtrl.delete(row.entity.id)">{{ \'delete\' | translate}}</a></span>';

        this.gridOptions = {
            enableRowHashing: false,
            infiniteScrollPercentage: 10,
            enableRowHeaderSelection: false,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field: 'barcode', displayName: 'Barcode'},
                {field: 'sku', displayName: 'Sku'},
                {field: 'enabled', displayName: 'Enable'},
                {field: 'nameGroup', displayName: 'Product Group'},
                {
                    headerCellClass: 'actions-header', cellClass: 'actions-column', maxWidth: 120, field: ' ',
                    cellTemplate: actionsTemplate, enableSorting: false, enableHiding: false
                }
            ]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                var data = [];
                ProductsDAO.query().then(function (result)
                {
                    angular.forEach(result, function (product)
                    {
                        product.enabled = product.enable ? 'Yes' : 'No';
                    });
                    data = result;
                    return ProductsGroupDAO.query();
                }).then(function (result)
                {
                    data = data.map(function (element)
                    {
                        for (var i = 0; i < result.length; i++) {
                            if (element.groupId === result[i].id) {
                                element.nameGroup = result[i].name;
                            }
                        }
                        return element;
                    });
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(data, page));
                    ++page;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                var data = [];
                ProductsDAO.query().then(function (result)
                {
                    angular.forEach(result, function (product)
                    {
                        product.enabled = product.enable ? 'Yes' : 'No';
                    });
                    data = result;
                    return ProductsGroupDAO.query();
                }).then(function (result)
                {
                    data = data.map(function (element)
                    {
                        for (var i = 0; i < result.length; i++) {
                            if (element.groupId === result[i].id) {
                                element.nameGroup = result[i].name;
                            }
                        }
                        return element;
                    });
                    ctrl.gridOptions.data = getDataUp(data, pageUp).reverse().concat(ctrl.gridOptions.data);
                    ++pageUp;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
        this.select2Options = {
            width: '100%',
            allowClear: true,
            multiple: false,
            minimumInputLength: 1,
            maximumInputLength: 10,
            initSelection: function ()
            {

            }
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
                ProductsDAO.remove(id).then(refresh);
            });
        };
        ProductsGroupDAO.query().then(function (result)
        {
            ctrl.group = result;
        });

        refresh();
    }

    angular.module('evoReports').controller('ProductsController', ['$modal', '$scope', 'ProductsDAO', 'ProductsGroupDAO', ProductsController]);
})();
