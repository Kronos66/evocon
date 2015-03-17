(function ()
{
    'use strict';
    function ModalMergeController($scope, DefectsDAO)
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
        DefectsDAO.query().then(function (result)
        {
            ctrl.gridOptions.data = getData(result, page);
            ++page;
        });
        this.merge = [];
        this.gridOptions = {
            //enableRowHeaderSelection: false,
            infiniteScrollPercentage: 10,
            enableRowSelection: true,
            columnDefs: [
                {
                    field: 'name',
                    displayName: 'Name'
                },
                {
                    field: 'groupId',
                    displayName: 'Group Id'
                },
                {
                    headerCellClass: 'last-column-modal',
                    field: 'createdDate',
                    displayName: 'Created Date'
                }
            ]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                var indexOf = ctrl.merge.indexOf(row.entity);
                if (-1 === indexOf) {
                    ctrl.merge.push(row.entity);
                } else {
                    ctrl.merge.splice(indexOf, 1);
                }
            });
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                var indexOf = ctrl.merge.indexOf(row.entity);
                if (-1 === indexOf) {
                    ctrl.merge.push(row.entity);
                } else {
                    ctrl.merge.splice(indexOf, 1);
                }
            });
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                DefectsDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(result, page));
                    ++page;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                DefectsDAO.query().then(function (result)
                {
                    ctrl.gridOptions.data = getDataUp(result, pageUp).reverse().concat(ctrl.gridOptions.data);
                    ++pageUp;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
    }

    angular.module('evoReports').controller('modalMergeDefectsDefects', ['$scope', 'DefectsDAO', ModalMergeController]);
})();
