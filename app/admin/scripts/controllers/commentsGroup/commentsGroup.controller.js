(function ()
{
    'use strict';
    function CommentsGroupController($modal, $scope, CommentsDAO, CommentsGroupDAO)
    {
        var ctrl = this;
        var selectedGroup;
        var refresh = function ()
        {
            CommentsGroupDAO.query().then(function (result)
            {
                ctrl.commentsGroup = result;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            data: 'groupCtrl.commentsGroup',
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
                        ctrl.visibled = true;
                        ctrl.commentsInGroup = result;
                    });
                } else {
                    ctrl.visibled = false;
                    selectedGroup = '';
                }
            });
        };
        this.gridOptions2 = {
            data: 'groupCtrl.commentsInGroup',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10
        };

        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/commentsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({},row);
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
