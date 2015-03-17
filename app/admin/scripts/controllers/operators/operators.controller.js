(function ()
{
    'use strict';
    angular.module('evoReports').controller('operatorsController', [
        '$modal', '$scope', 'operatorsDAO',
        function ($modal, $scope, operatorsDAO)
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
                operatorsDAO.query().then(function (data)
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
                        field: 'firstname',
                        displayName: 'First Name'
                    },
                    {
                        field: 'lastname',
                        displayName: 'Last Name'
                    },
                    {
                        field: 'barcode',
                        displayName: 'Barcode'
                    },
                    {
                        headerCellClass: 'actions-header',
                        cellClass: 'actions-column',
                        maxWidth: 120,
                        field: ' ',
                        cellTemplate: '<span class="buttonActions">' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.opCtrl.editOp( row.entity )">' +
                        '{{\'edit\'|translate}}</a>' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.opCtrl.deleteOp( row.entity.id )">' +
                        '{{\'delete\'|translate}}</a>' +
                        '</span>', enableSorting: false, enableHiding: false
                    }
                ]
            };
            this.gridOptions.onRegisterApi = function (gridApi)
            {
                gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
                {
                    operatorsDAO.query().then(function (data)
                    {
                        ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(data, page));
                        ++page;
                        gridApi.infiniteScroll.dataLoaded();
                    });
                });
                gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
                {
                    operatorsDAO.query().then(function (data)
                    {
                        ctrl.gridOptions.data = getDataUp(data, pageUp).reverse().concat(ctrl.gridOptions.data);
                        ++pageUp;
                        gridApi.infiniteScroll.dataLoaded();
                    });
                });
            };
            ctrl.newOp = function ()
            {
                var row = {};
                var modalInstance = $modal.open({
                    templateUrl: 'admin/views/operators/addOrEditOperatorModal.tpl.html',
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
                modalInstance.result.then(operatorsDAO.create).then(refresh);
            };

            ctrl.editOp = function (entity)
            {
                var row = angular.extend({}, entity);
                var modalInstance = $modal.open({
                    templateUrl: 'admin/views/operators/addOrEditOperatorModal.tpl.html',
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
                modalInstance.result.then(operatorsDAO.update).then(refresh);
            };

            ctrl.deleteOp = function (entity)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'admin/views/confirmModal.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                modalInstance.result.then(function ()
                {
                    operatorsDAO.delete(entity).then(refresh);
                });
            };

            refresh();

        }]);
})();
