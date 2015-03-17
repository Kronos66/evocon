(function ()
{
    'use strict';
    function StationGroupController($modal, $scope, StationGroupDAO)
    {
        var ctrl = this;
        var selectedGroup;

        var pageStationGroup = 0;
        var pageUpStationGroup = 0;

        var pageStations = 0;
        var pageUpStations = 0;

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
            StationGroupDAO.query().then(function (result)
            {
                ctrl.gridOptions.data = getData(result, pageStationGroup);
                ++pageStationGroup;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationGroupController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.stationGroupController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';
        this.gridOptions = {
            infiniteScrollPercentage: 10,
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'description', displayName: 'Description'
                         }, {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column',
                             maxWidth: 120, field: ' ', displayName: '', cellTemplate: actionsTemplate, enableSorting: false, enableHiding: false
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (selectedGroup !== row.entity.id) {
                    pageStations = 0;
                    pageUpStations = 0;
                    selectedGroup = row.entity.id;
                    StationGroupDAO.get(row.entity.id).then(function (result)
                    {
                        ctrl.visibled = true;
                        ctrl.station = result;
                    });
                } else {
                    ctrl.visibled = false;
                    selectedGroup = '';
                }
            });
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                StationGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(result, pageStationGroup));
                    ++pageStationGroup;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                StationGroupDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = getDataUp(result, pageUpStationGroup).reverse().concat(ctrl.gridOptions.data);
                    ++pageUpStationGroup;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
        this.gridOptions2 = {
            infiniteScrollPercentage: 10
        };
        this.gridOptions2.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                StationGroupDAO.get(selectedGroup).then(function (result)
                {
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(result, pageStations));
                    ++pageStations;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                StationGroupDAO.get(selectedGroup).then(function (result)
                {
                    ctrl.gridOptions.data = getDataUp(result, pageUpStations).reverse().concat(ctrl.gridOptions.data);
                    ++pageUpStations;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/stationGroup/editOrCreateModal.tpl.html',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });
            modalInstance.result.then(StationGroupDAO.update).then(refresh);
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
                StationGroupDAO.remove(id).then(refresh);
            });
        };
        this.addStation = function ()
        {
            var row;
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/stationGroup/editOrCreateModal.tpl.html',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(StationGroupDAO.save).then(refresh);
        };
        refresh();
    }

    angular.module('evoReports').controller('stationGroupController', ['$modal', '$scope', 'StationGroupDAO', StationGroupController]);
})();
