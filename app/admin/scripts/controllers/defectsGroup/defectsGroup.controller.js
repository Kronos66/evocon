(function ()
{
    'use strict';

    function DefectsGroupController($modal, $scope, DefectsDAO, DefectsGroupDAO)
    {
        var ctrl = this;
        var selectedGroup;

        var pageGroupDefect = 0;
        var pageUpGroupDefect = 0;

        var pageDefects = 0;
        var pageUpDefects = 0;

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
            pageGroupDefect = 0;
            pageUpGroupDefect = 0;
            DefectsGroupDAO.query().then(function (result)
            {
                ctrl.gridOptions.data = getData(result, pageGroupDefect);
                ++pageGroupDefect;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.groupCtrl.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';

        this.gridOptions = {
            infiniteScrollPercentage: 10,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             headerCellClass: 'actions-header two-columns',
                             cellClass: 'actions-column',
                             maxWidth: 120, field: ' ', cellTemplate: actionsTemplate, enableSorting: false, enableHiding: false
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (selectedGroup !== row.entity.id) {
                    selectedGroup = row.entity.id;
                    pageDefects = 0;
                    pageUpDefects = 0;
                    DefectsGroupDAO.getDefects(row.entity.id).then(function (result)
                    {
                        ctrl.visibled = true;
                        ctrl.defectsInGroup = result;
                    });
                } else {
                    ctrl.visibled = false;
                    selectedGroup = '';
                }
            });
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                DefectsGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(result, pageGroupDefect));
                    ++pageGroupDefect;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                DefectsGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = getDataUp(result, pageUpGroupDefect).reverse().concat(ctrl.gridOptions.data);
                    ++pageUpGroupDefect;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
        this.gridOptions2 = {
            enableRowHeaderSelection: false,
            enableRowSelection: false,
            multiSelect: false,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'groupId', displayName: 'Group'
                         }, {
                             field: 'stationId', displayName: 'Station'
                         }, {
                             field: 'createdDate', displayName: 'Created'
                         }]
        };
        this.gridOptions2.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                DefectsGroupDAO.getDefects(selectedGroup).then(function (result)
                {
                    ctrl.gridOptions2.data = ctrl.gridOptions2.data.concat(getData(result, pageDefects));
                    ++pageDefects;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                DefectsGroupDAO.getDefects(selectedGroup).then(function (result)
                {
                    ctrl.gridOptions2.data = getDataUp(result, pageUpDefects).reverse().concat(ctrl.gridOptions2.data);
                    ++pageUpDefects;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defectsGroup/editOrCreateModal.tpl.html',
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
            modalInstance.result.then(DefectsGroupDAO.update).then(refresh);
        };
        this.addRow = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defectsGroup/editOrCreateModal.tpl.html',
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

            modalInstance.result.then(DefectsGroupDAO.save).then(refresh);
        };
        this.newDefect = function ()
        {
            var row = {groupId: selectedGroup};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalDefectsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(DefectsDAO.save).then(refresh);
        };
        this.deleteRow = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html', backdrop: 'static', keyboard: false
            });
            modalInstance.result.then(function ()
            {
                DefectsGroupDAO.remove(id).then(refresh);
            });
        };
        refresh();

    }

    angular.module('evoReports').controller('defectsGroupController', ['$modal', '$scope', 'DefectsDAO', 'DefectsGroupDAO', DefectsGroupController]);
})();
