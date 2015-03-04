(function ()
{
    'use strict';
    function ProductDetailController($location, $routeParams, ProductsDAO, ProductsGroupDAO)
    {
        var ctrl = this;

        this.product = null;

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

        var init = function ()
        {
            if ($routeParams.id === 'addnew') {
                ctrl.product = {};
                ctrl.isCreating = true;
            } else {
                ProductsDAO.get($routeParams.id).then(function (product)
                {
                    ctrl.isCreating = false;
                    ctrl.product = product;
                });
            }
        };

        this.selectGroup = function (selectedId)
        {
            return selectedId === parseInt(ctrl.product.groupId);
        };

        this.save = function () {
            if ($routeParams.id === 'addnew') {
                ProductsDAO.save(ctrl.product).then(function () {
                    $location.path('/product');
                });
            } else {
                ProductsDAO.update(ctrl.product).then(function ()
                {
                    $location.path('/product');
                });
            }
        };

        ProductsGroupDAO.query().then(function (result)
        {
            ctrl.group = result;
            ctrl.resultCount = result.length;
        });

        init();
    }

    angular.module('evoReports').controller('ProductDetailController', ['$location', '$routeParams', 'ProductsDAO', 'ProductsGroupDAO', ProductDetailController]);
})();
