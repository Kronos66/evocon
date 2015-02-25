(function ()
{
    'use strict';
    function ProductsGroupController($modal, ProductsGroupDAO)
    {
        var ctrl = this;

        this.group = null;
        this.resultCount = null;

        this.gridOptions = {
            height: '100%',
            data: 'groupCtrl.group',
            columnDefs: [
                {field:'name', displayName:'Name'}
            ]
        };

        this.newGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/productsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'ModalProductsGroupController',
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

        this.delete = function (id)
        {
            ProductsGroupDAO.remove(id).then(refresh);
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

    angular.module('evoReports').controller('ProductsGroupController', ['$modal', 'ProductsGroupDAO', ProductsGroupController]);
})();
