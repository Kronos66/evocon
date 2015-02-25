(function ()
{
    'use strict';
    function ProductsController($modal, ProductsDAO)
    {
        var ctrl = this;

        this.products = null;
        this.resultCount = null;

        this.gridOptions = {
            height: '100%',
            data: 'productsCtrl.products',
            columnDefs: [
                {field:'name', displayName:'Name'},
                {field:'barcode', displayName:'Barcode'},
                {field:'enable', displayName:'Enable'},
                {field:'groupId', displayName:'Product Group'}
            ]
        };

        this.newProduct = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/products/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'ModalProductsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(ProductsDAO.save).then(refresh);
        };

        this.delete = function (id)
        {
            ProductsDAO.remove(id).then(refresh);
        };

        var refresh = function ()
        {
            ProductsDAO.query().then(function (result)
            {
                ctrl.products = result;
                ctrl.resultCount = result.length;
            });
        };

        refresh();

//        this.newGroup = function ()
//        {
//            var row = {};
//            var modalInstance = $modal.open({
//                templateUrl: 'admin/views/commentsGroup/editOrCreateModal.tpl.html',
//                backdrop: 'static',
//                keyboard: false,
//                controller: 'modalGroupCommentsController',
//                controllerAs: 'modal',
//                resolve: {
//                    row: function ()
//                    {
//                        return row;
//                    }
//                }
//            });
//
//            modalInstance.result.then(CommentsGroupDAO.save).then(refresh);
//        };
//
//        this.addRow = function ()
//        {
//            var row = {};
//            var modalInstance = $modal.open({
//                templateUrl: 'admin/views/comments/editOrCreateModal.tpl.html',
//                backdrop: 'static',
//                keyboard: false,
//                controller: 'modalCommentsController',
//                controllerAs: 'modal',
//                resolve: {
//                    row: function ()
//                    {
//                        return row;
//                    }
//                }
//            });
//            modalInstance.result.then(CommentsDAO.save).then(refresh);
//        };
//        this.editRow = function (row)
//        {
//            var modalInstance = $modal.open({
//                templateUrl: 'admin/views/comments/editOrCreateModal.tpl.html',
//                backdrop: 'static',
//                keyboard: false,
//                controller: 'modalCommentsController',
//                controllerAs: 'modal',
//                resolve: {
//                    row: function ()
//                    {
//                        return angular.extend({}, row);
//                    }
//                }
//            });
//
//            modalInstance.result.then(function (result)
//            {
//                result.groupComments = result.groupComments.id;
//                CommentsDAO.update(result);
//            }).then(refresh);
//        };
    }

    angular.module('evoReports').controller('ProductsController', ['$modal', 'ProductsDAO', ProductsController]);
})();
