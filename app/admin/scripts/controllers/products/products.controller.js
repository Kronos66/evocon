(function ()
{
    'use strict';
    function ProductsController($modal,ProductsDAO, ProductsGroupDAO)
    {
        var ctrl = this;

        this.products = null;
        this.resultCount = null;

        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-href="#/product/{{row.entity.id}}">{{ \'edit\' | translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.productsCtrl.delete(row.entity.id)">{{ \'delete\' | translate}}</a></span>';

        this.gridOptions = {
            enableRowHashing: false,
            data: 'productsCtrl.products',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableRowHeaderSelection: false,
            columnDefs: [
                {field:'name', displayName:'Name'},
                {field:'barcode', displayName:'Barcode'},
                {field:'sku', displayName:'Sku'},
                {field:'enable', displayName:'Enable'},
                {field:'groupId', displayName:'Product Group'},
                {headerCellClass: 'actions-header', cellClass: 'actions-column', maxWidth: 120, field: ' ',
                    cellTemplate: actionsTemplate, enableSorting: false, enableHiding: false}
            ]
        };



        this.select2Options = {
            width:'100%',
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

        var refresh = function ()
        {
            ProductsDAO.query().then(function (result)
            {
                ctrl.products = result;
                ctrl.resultCount = result.length;
            });
        };

        ProductsGroupDAO.query().then(function (result)
        {
            ctrl.group = result;
            ctrl.resultCount = result.length;
        });

        refresh();
    }

    angular.module('evoReports').controller('ProductsController', ['$modal','ProductsDAO', 'ProductsGroupDAO', ProductsController]);
})();
