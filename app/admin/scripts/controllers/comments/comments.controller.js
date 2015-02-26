(function ()
{
    'use strict';
    function CommentsController($modal, CommentsDAO, CommentsGroupDAO)
    {
        var ctrl = this;
        this.filter = {query: null, size: 10};
        this.listFilter = {size: 10};
        this.currentPage = 1;
        var refresh = function ()
        {
            CommentsDAO.query().then(function (result)
            {
                ctrl.comments = result;
            });
        };
        var actionsTemplate = '<a class="button link" ng-click="grid.appScope.commentsController.editRow(row.entity)">{{\'edit\'|translate}}</a>\n<a class="button link" ng-click="grid.appScope.commentsController.deleteRow(row.entity.id)">{{\'delete\'|translate}}</a>';

        this.gridOptions = {
            enableRowHashing: false,
            data: 'commentsController.comments',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableRowHeaderSelection: false,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'commentsGroup', displayName: 'Group'
                         }, {
                             field: 'category', displayName: 'Category'
                         }, {
                             field: 'color', displayName: 'Color'
                         }, {
                             displayName: 'Actions', field: 'remove', cellTemplate: actionsTemplate
                         }]
        };
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
                console.log(result);
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


    angular.module('evoReports').controller('commentsController', ['$modal', 'CommentsDAO', 'CommentsGroupDAO', CommentsController]);
})();
