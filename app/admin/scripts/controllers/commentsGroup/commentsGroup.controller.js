(function ()
{
    'use strict';
    function CommentsGroupController($modal, $scope, CommentsDAO, CommentsGroupDAO)
    {
        var ctrl = this;
        var selectedGroup;
        var pageCommentsGroup = 0;
        var pageUpCommentGroup = 0;
        var pageComments = 0;
        var pageUpComments = 0;
        var getData = function (data, page)
        {
            var res = [];
            for (var i = (page * 20); i < (page + 1) * 20 && i < data.length; ++i) {
                res.push(data[i]);
            }
            return res;
        };

        var getDataUp = function (data, page)
        {
            var res = [];
            for (var i = data.length - (page * 20) - 1; (data.length - i) < ((page + 1) * 20) && (data.length - i) > 0; --i) {
                if (data[i]) {
                    res.push(data[i]);
                }
            }
            return res;
        };
        var refresh = function ()
        {
            pageCommentsGroup = 0;
            pageUpCommentGroup = 0;
            CommentsGroupDAO.query().then(function (result)
            {
                ctrl.gridOptions.data = getData(result, pageCommentsGroup);
                ++pageCommentsGroup;
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
            infiniteScrollPercentage: 10,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'color', displayName: 'Color'
                         }, {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column',
                             maxWidth: 100, field: ' ', cellTemplate: actionsTemplate, enableSorting: false, enableHiding: false
                         }]
        };
        this.gridOptions2 = {};
        this.gridOptions2.onRegisterApi = function (commentsApi)
        {
            commentsApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                CommentsGroupDAO.getComments(selectedGroup).then(function (result)
                {
                    pageComments = 0;
                    pageUpComments = 0;
                    ctrl.visibled = true;
                    ctrl.gridOptions2.data = ctrl.gridOptions2.data.concat(getData(result, pageComments));
                    ++pageComments;
                    commentsApi.infiniteScroll.dataLoaded();
                });
            });
            commentsApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                CommentsGroupDAO.getComments(selectedGroup).then(function (result)
                {
                    ctrl.visibled = true;
                    ctrl.gridOptions2.data = getDataUp(result, pageUpComments).reverse().concat(ctrl.gridOptions2.data);
                    ++pageUpComments;
                    commentsApi.infiniteScroll.dataLoaded();
                });
            });

        };
        this.gridOptions.onRegisterApi = function (groupCommentsApi)
        {
            groupCommentsApi.selection.on.rowSelectionChanged($scope, function (row)
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
            groupCommentsApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                CommentsGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(result, pageCommentsGroup));
                    ++pageCommentsGroup;
                    groupCommentsApi.infiniteScroll.dataLoaded();
                });
            });
            groupCommentsApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                CommentsGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = getDataUp(result, pageUpCommentGroup).reverse().concat(ctrl.gridOptions.data);
                    ++pageUpCommentGroup;
                    groupCommentsApi.infiniteScroll.dataLoaded();
                });
            });
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
                        return angular.extend({}, row);
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
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function ()
            {
                CommentsGroupDAO.remove(id).then(refresh);
            });
        };
        refresh();
    }

    angular.module('evoReports').controller('commentsGroupController', ['$modal', '$scope', 'CommentsDAO', 'CommentsGroupDAO', CommentsGroupController]);
})();
