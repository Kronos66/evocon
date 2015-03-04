(function ()
{
    'use strict';
    function CommentsController($modal, CommentsDAO, CommentsGroupDAO)
    {
        var ctrl = this;
        var refresh = function ()
        {
            CommentsDAO.query().then(function (result)
            {
                ctrl.comments = result;
            });
        };
        var actionsTemplate = '<span class="buttonActions">' +
                '<a class="button link" ng-click="grid.appScope.commentsController.editRow(row.entity)">{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.commentsController.deleteRow(row.entity.id)">{{\'delete\'|translate}}</a>' +
                '</span>';

        this.gridOptions = {
            enableRowHashing: false,
            data: 'commentsController.comments',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableRowHeaderSelection: false,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'groupId', displayName: 'Group ID'
                         }, {
                             field: 'category', displayName: 'Category'
                         }, {
                             field: 'color', displayName: 'Color'
                         }, {
                            headerCellClass: 'smallActionsWidthHeader',
                            maxWidth: 120, field: ' ', cellTemplate: actionsTemplate
                         }]
        };
        this.newGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/commentsGroup/editOrCreateModal.tpl.html',
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

            modalInstance.result.then(CommentsDAO.update).then(refresh);
        };
        this.deleteRow = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function ()
            {
                CommentsDAO.remove(id).then(refresh);
            });

        };

        this.mergeComments = function ()
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/comments/mergeModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                controller: 'modalMergeCommentsController',
                controllerAs: 'modal'
            });
            modalInstance.result.then(CommentsDAO.merge).then(refresh);
        };
        refresh();
    }


    angular.module('evoReports').controller('commentsController', ['$modal', 'CommentsDAO', 'CommentsGroupDAO', CommentsController]);
})();
