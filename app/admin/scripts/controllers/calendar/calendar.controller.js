(function ()
{
    'use strict';

    function CalendarController($modal, $scope, CalendarDAO)
    {
        var ctrl = this;
        var refresh = function ()
        {
            CalendarDAO.query().then(function (result)
            {
                ctrl.dataCalendar = result;
                angular.forEach(ctrl.dataCalendar, function (element)
                {
                    if (1 === element.enabled) {
                        element.enable = 'Yes';
                    } else {
                        element.enable = 'No';
                    }
                });
            });
        };
        var actionsTemplate = '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            data: 'calendarController.dataCalendar',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'description', displayName: 'Description'
                         }, {
                             field: 'enable', displayName: 'Enable'
                         }, {
                             displayName: 'Actions', field: 'remove', cellTemplate: actionsTemplate
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            var data;
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                if (data !== row) {
                    data = row;
                    ctrl.visible = true;
                    ctrl.gridOptions2 = {
                        data: row.entity.lines,
                        columnDefs:[{
                                        field:'id', displayName:'Calendar id'
                                    },{
                                        field:'startTime',displayName:'Start time'
                                    },{
                                        field:'endTime',displayName:'End time'
                                    }]
                    };
                } else {
                    ctrl.visible = false;
                    data=null;
                }
            });
        };

        this.addCalendar = function ()
        {
            var modalInstance = $modal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendar/editOrCreateModal.tpl.html',
                controller: 'editOrCreateModalController',
                size: 'lg',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({});
                    }
                }
            });
            modalInstance.result.then(CalendarDAO.save).then(refresh);
        };

        this.deleteRow = function (id)
        {
            CalendarDAO.remove(id).then(refresh);
        };

        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendar/editOrCreateModal.tpl.html',
                controller: 'editOrCreateModalController',
                size: 'lg',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });
            modalInstance.result.then(CalendarDAO.update).then(refresh);
        };
        refresh();
    }

    angular.module('evoReports').controller('calendarController', ['$modal', '$scope', 'CalendarDAO', CalendarController]);
})();