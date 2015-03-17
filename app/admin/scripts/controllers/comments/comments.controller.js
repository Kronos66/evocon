(function ()
{
    'use strict';
    function CommentsController($modal, $scope, CommentsDAO, CommentsGroupDAO)
    {
        var ctrl = this;
        var page = 0;
        var pageUp = 0;
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
            var data = [];
            page = 0;
            pageUp = 0;
            CommentsDAO.query().then(function (result)
            {
                data = result;
                return CommentsGroupDAO.query();
            }).then(function (result)
            {
                data = data.map(function (element)
                {
                    for (var i = 0; i < result.length; i++) {
                        if (parseInt(element.groupId) === result[i].id) {
                            element.nameGroup = result[i].name;
                        }
                    }
                    return element;
                });
                ctrl.gridOptions.data = getData(data, page);
                ++page;
            });
        };
        var actionsTemplate = '<span class="buttonActions">' +
                '<a class="button link" ng-click="grid.appScope.commentsController.editRow(row.entity)">{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.commentsController.deleteRow(row.entity.id)">{{\'delete\'|translate}}</a>' +
                '</span>';

        this.gridOptions = {
            enableRowHashing: false,
            infiniteScrollPercentage: 10,
            enableRowHeaderSelection: false,
            columnDefs: [{
                             field: 'name',
                             displayName: 'Name'
                         },
                         {
                             field: 'nameGroup',
                             displayName: 'Group'
                         },
                         {
                             field: 'category',
                             displayName: 'Category'
                         },
                         {
                             field: 'color',
                             displayName: 'Color'
                         },
                         {
                             enableSorting: false,
                             enableHiding: false,
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column',
                             maxWidth: 120,
                             field: ' ',
                             cellTemplate: actionsTemplate
                         }]
        };

        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                var data = [];
                CommentsDAO.query().then(function (result)
                {
                    data = result;
                    return CommentsGroupDAO.query();
                }).then(function (result)
                {
                    data = data.map(function (element)
                    {
                        for (var i = 0; i < result.length; i++) {
                            if (parseInt(element.groupId) === result[i].id) {
                                element.nameGroup = result[i].name;
                            }
                        }
                        return element;
                    });
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(data, page));
                    ++page;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                var data = [];
                CommentsDAO.query().then(function (result)
                {
                    data = result;
                    return CommentsGroupDAO.query();
                }).then(function (result)
                {
                    data = data.map(function (element)
                    {
                        for (var i = 0; i < result.length; i++) {
                            if (parseInt(element.groupId) === result[i].id) {
                                element.nameGroup = result[i].name;
                            }
                        }
                        return element;
                    });
                    ctrl.gridOptions.data = getDataUp(data, pageUp).reverse().concat(ctrl.gridOptions.data);
                    ++pageUp;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
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
                templateUrl: 'admin/views/confirmModal.tpl.html', backdrop: 'static', keyboard: false
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


    angular.module('evoReports').controller('commentsController', ['$modal', '$scope', 'CommentsDAO', 'CommentsGroupDAO', CommentsController]);
})
();
