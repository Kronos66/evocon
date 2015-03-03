(function ()
{
    'use strict';
    function ModalMergeController($scope, CommentsDAO)
    {
        var ctrl = this;
        CommentsDAO.query().then(function (result)
        {
            ctrl.commentsToMerge = result;
        });
        this.merge = [];
        this.gridOptions = {
            //enableRowHeaderSelection: false,
            enableRowSelection: true,
            data: 'modal.commentsToMerge',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                             field: 'name',
                             displayName: 'Name'
                         },
                         {
                             field: 'category',
                             displayName: 'Category',
                             cellClass: 'special-cell shorter'
                         },
                         {
                             field: 'color',
                             displayName: 'Color'
                         }]
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

    angular.module('evoReports').controller('modalMergeCommentsController', ['$scope', 'CommentsDAO', ModalMergeController]);
})();
