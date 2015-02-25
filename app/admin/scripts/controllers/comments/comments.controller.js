(function ()
{
    'use strict';
    function CommentsController($modal, CommentsDAO, CommentsGroupDAO, paginationSupport)
    {
        var ctrl = this;
        this.filter = {query: null, size: 10};
        this.listFilter = {size: 10};
        this.currentPage = 1;
        var refresh = paginationSupport(ctrl.filter, function (callback)
        {
            CommentsDAO.query().then(function (result)
            {
                ctrl.comments = result;
                ctrl.resultCount = result.length;
                callback(result.length);
            });
        });

        this.newGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/commentsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalGroupCommentsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });

            modalInstance.result.then(CommentsGroupDAO.save).then(refresh);
        };
        this.addRow = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/comments/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalCommentsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(CommentsDAO.save).then(refresh);
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/comments/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalCommentsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });

            modalInstance.result.then(function (result)
            {
                result.groupComments = result.groupComments.id;
                CommentsDAO.update(result);
            }).then(refresh);
        };
        this.deleteRow = function (id)
        {
            CommentsDAO.remove(id).then(refresh);
        };

        this.mergeComments = function ()
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/comments/mergeModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                controller: 'modalMergeController',
                controllerAs: 'modal'
            });
            modalInstance.result.then(CommentsDAO.merge).then(refresh);
        };
        refresh();
    }


    angular.module('evoReports').controller('commentsController', ['$modal', 'CommentsDAO', 'CommentsGroupDAO', 'paginationSupport', CommentsController]);
})();
