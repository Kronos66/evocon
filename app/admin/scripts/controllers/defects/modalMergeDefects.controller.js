(function ()
{
    'use strict';
    function ModalMergeController($scope,DefectsDAO)
    {
        var ctrl = this;
        DefectsDAO.query().then(function (result)
        {
            ctrl.defectsToMerge = result;
        });
        this.merge = [];
        this.gridOptions = {
            //enableRowHeaderSelection: false,
            enableRowSelection: true,
            data: 'modal.defectsToMerge',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [
                {
                    field: 'name',
                    displayName: 'Name'
                },
                {
                    field: 'groupId',
                    displayName: 'Group Id',
                    cellClass: 'special-cell shorter'
                },
                {
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
        };
    }

    angular.module('evoReports').controller('modalMergeDefectsDefects', ['$scope', 'DefectsDAO', ModalMergeController]);
})();