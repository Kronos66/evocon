(function ()
{
    'use strict';
    function CommentsGroupController($modal, CommentsDAO, CommentsGroupDAO, paginationSupport)
    {
        var ctrl = this;
        this.filter = {query: null, size: 10};
        this.listFilter = {size: 10};
        this.currentPage = 1;
        var selectedGroup;
        var refresh = paginationSupport(ctrl.filter, function (callback)
        {
            CommentsGroupDAO.query().then(function (result)
            {
                ctrl.commentsGroup = result;
                ctrl.resultCount = result.length;
                callback(result.length);
            });
        });
        this.editRow = function (row)
        {
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
            modalInstance.result.then(CommentsGroupDAO.update).then(refresh);
        };
        this.addRow = function ()
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
        this.selectGroup = function (id)
        {
            if (selectedGroup !== id) {
                selectedGroup = id;
            } else {
                selectedGroup = '';
            }
        };
        this.checkSelected = function (id)
        {
            return selectedGroup === id;
        };
        this.newComments = function ()
        {
            var row = {groupId: selectedGroup};
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
            modalInstance.result.then(function (result)
            {
                result.groupId = parseInt(result.groupId);
                CommentsDAO.save(result);
            }).then(refresh);
        };
        this.deleteRow = function (id)
        {
            CommentsGroupDAO.remove(id).then(refresh);
        };
        refresh();
    }

    angular.module('evoReports').controller('commentsGroupController',
            ['$modal', 'CommentsDAO', 'CommentsGroupDAO', 'paginationSupport', CommentsGroupController]);
})();
