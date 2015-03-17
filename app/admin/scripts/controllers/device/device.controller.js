(function ()
{
    'use strict';
    angular.module('evoReports').controller('deviceController', ['$modal','$scope', 'deviceDAO', function ($modal,$scope, deviceDAO)
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
            page = 0;
            pageUp = 0;
            deviceDAO.query().then(function (data)
            {
                ctrl.gridOptions.data = getData(data, page);
                ++page;
            });
        };
        ctrl.gridOptions = {
            enableRowSelection: false,
            infiniteScrollPercentage: 10,
            enableRowHeaderSelection: false,
            columnDefs: [
                {
                    field: 'id',
                    displayName: 'Id',
                    maxWidth: 100,
                    minWidth: 100
                }, {
                    field: 'description',
                    displayName: 'Description'
                }, {
                    field: 'inputs',
                    displayName: 'Inputs'
                },
                {
                    headerCellClass: 'device-actions-header',
                    cellClass: 'actions-column',
                    maxWidth: 120,
                    enableSorting: false,
                    enableHiding: false,
                    field: ' ',
                    cellTemplate: '<span class="buttonActions">' +
                    '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.devCtrl.editDev( row.entity )">' +
                    '{{\'edit\'|translate}}</a>' +
                    '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.devCtrl.deleteDev( row.entity.id )">' +
                    '{{\'delete\'|translate}}</a>' +
                    '</span>'
                }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                deviceDAO.query().then(function (data)
                {
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(data, page));
                    ++page;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                deviceDAO.query().then(function (data)
                {
                    ctrl.gridOptions.data = getDataUp(data, pageUp).reverse().concat(ctrl.gridOptions.data);
                    ++pageUp;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
        ctrl.newDev = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/device/addOrEditModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                size: 'md',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(deviceDAO.save).then(refresh);
        };

        ctrl.editDev = function (entity)
        {
            var row = angular.extend({}, entity);
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/device/addOrEditModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                size: 'md',
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(deviceDAO.update).then(refresh);
        };

        ctrl.deleteDev = function (entity)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function ()
            {
                deviceDAO.remove(entity).then(refresh);
            });
        };

        refresh();

    }]);
})();
