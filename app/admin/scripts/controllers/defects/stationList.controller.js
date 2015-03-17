(function ()
{
    'use strict';
    function StationListController($scope, StationsDAO)
    {
        var ctrl = this;
        ctrl.addStations = [];
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

        this.gridOptions = {
            enableRowSelection: true,
            columnDefs: [{
                             field: 'stationId', displayName: 'ID'
                         }, {
                             field: 'name', displayName: 'Name'
                         }, {
                             headerCellClass: 'last-column-modal',
                             field: 'description', displayName: 'Description'
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                var indexOf = ctrl.addStations.indexOf(row.entity);
                if (-1 === indexOf) {
                    ctrl.addStations.push(row.entity);
                } else {
                    ctrl.addStations.splice(indexOf, 1);
                }
            });
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                StationsDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(result, page));
                    ++page;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                StationsDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = getDataUp(result, pageUp).reverse().concat(ctrl.gridOptions.data);
                    ++pageUp;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };

        StationsDAO.query().then(function (result)
        {
            ctrl.gridOptions.data = getData(result, page);
            ++page;
        });
    }

    angular.module('evoReports').controller('stationListController', ['$scope', 'StationsDAO', StationListController]);
})();
