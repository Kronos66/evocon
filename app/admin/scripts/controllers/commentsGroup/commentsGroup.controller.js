(function ()
{
    'use strict';
    function CommentsGroupController($modal, $scope, CommentsDAO, CommentsGroupDAO)
    {
        var ctrl = this;
        this.filter = {query: null, size: 10};
        this.listFilter = {size: 10};
        this.currentPage = 1;
        var selectedGroup;
        var refresh = function ()
        {
            CommentsGroupDAO.query().then(function (result)
            {
                ctrl.commentsGroup = result;
            });
        };
        var actionsTemplate = '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupController.editRow(row.entity)">{{\'edit\'|translate}}</a>\n<a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupController.deleteRow(row.entity.id)">{{\'delete\'|translate}}</a>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            data: 'groupController.commentsGroup',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'groupId', displayName: 'Group'
                         }, {
                             field: 'category', displayName: 'Category'
                         }, {
                             field: 'color', displayName: 'Color'
                         }, {
                             displayName: 'Actions', field: 'remove', cellTemplate: actionsTemplate
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (selectedGroup !== row.entity.id) {
                    selectedGroup = row.entity.id;
                    CommentsGroupDAO.getComments(row.entity.id).then(function (result)
                    {
                        console.log('work');
                        ctrl.visibled = true;
                        ctrl.commentsInGroup = result;
                    });
                } else {
                    ctrl.visibled = false;
                    selectedGroup = '';
                }
                console.log(ctrl.visibled);
            });
        };
        this.gridOptions2 = {
            data: 'groupController.commentsInGroup', paginationPageSizes: [10, 20, 30], paginationPageSize: 10
        };

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

    angular.module('evoReports').controller('commentsGroupController', ['$modal', '$scope', 'CommentsDAO', 'CommentsGroupDAO', CommentsGroupController]);
})();
