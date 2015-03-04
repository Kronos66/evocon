/*globals moment*/
(function ()
{
    'use strict';

    function CalendarController($modal, $scope, CalendarDAO, CalendarLineDAO)
    {
        var ctrl = this;
        var selected;
        var refresh = function ()
        {
            CalendarDAO.query().then(function (result)
            {
                ctrl.dataCalendar = result;
            });
        };
        var refreshLine = function (id)
        {
            CalendarLineDAO.query(id).then(function (result)
            {
                angular.forEach(result, function (calendarLine)
                {
                    calendarLine.startTime = moment('1970-01-01 ' + calendarLine.startTime).format('HH:mm');
                    calendarLine.endTime = moment('1970-01-01 ' + calendarLine.endTime).format('HH:mm');
                });
                ctrl.lines = result;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            data: 'calendarController.dataCalendar',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                             field: 'name',
                             displayName: 'Name'
                         },
                         {
                             field: 'description',
                             displayName: 'Description'
                         },
                         {
                             field: 'datecalcultion',
                             displayName: 'Date calculation',
                             cellClass: 'special-cell more-shorter'
                         },
                         {
                             headerCellClass: 'smallActionsWidthHeader',
                             cellClass: 'smallActionsWidth actionsDivToRight',
                             maxWidth: 120,
                             field: ' ',
                             cellTemplate: actionsTemplate,
                             enableSorting: false,
                             enableHiding: false
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            var data;
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                refreshLine(row.entity.id);
                var actionsTemplate2 = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editLine(row.entity)">' +
                        '{{\'edit\'|translate}}</a>' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteLine(row.entity.id)">' +
                        '{{\'delete\'|translate}}</a></span>';
                if (data !== row) {
                    data = row;
                    selected = row.entity;
                    ctrl.visible = true;
                    ctrl.gridOptions2 = {
                        data: 'calendarController.lines', columnDefs: [{
                                                                           field: 'id',
                                                                           displayName: 'ID'
                                                                       },
                                                                       {
                                                                           field: 'startTime',
                                                                           displayName: 'Start time'
                                                                       },
                                                                       {
                                                                           field: 'endTime',
                                                                           displayName: 'End time',
                                                                           cellClass: 'special-cell more-shorter'
                                                                       },
                                                                       {
                                                                           headerCellClass: 'smallActionsWidthHeader',
                                                                           cellClass: 'smallActionsWidth actionsDivToRight',
                                                                           maxWidth: 120,
                                                                           field: ' ',
                                                                           cellTemplate: actionsTemplate2,
                                                                           enableSorting: false,
                                                                           enableHiding: false
                                                                       }]
                    };
                } else {
                    ctrl.visible = false;
                    data = null;
                }
            });
        };
        this.deleteLine = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html', backdrop: 'static', keyboard: false
            });
            modalInstance.result.then(function ()
            {
                CalendarLineDAO.remove(selected.id, id).then(function ()
                {
                    refreshLine(selected.id);
                });
            });
        };
        this.editLine = function (line)
        {
            line.nameCalendar = selected.name;
            var modalInstance = $modal.open({
                controller: 'calendarLineController',
                controllerAs: 'modal',
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendarLine/editOrCreateModal.tpl.html',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, line);
                    }
                }
            });
            var variable = {};
            modalInstance.result.then(function (result)
            {
                angular.extend(variable, result);
                variable.startTime = moment(result.startTime).format('HH:mm:ss');
                variable.endTime = moment(result.endTime).format('HH:mm:ss');
                return CalendarLineDAO.update(selected.id, variable);
            }).then(function ()
            {
                refreshLine(selected.id);
            });
        };
        this.addCalendar = function ()
        {
            var modalInstance = $modal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendar/editOrCreateModal.tpl.html',
                controller: 'addGroup',
                size: 'md',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({});
                    }
                }
            });
            modalInstance.result.then(function (result)
            {
                result.enabled = result.enabled ? 1 : 0;
                return CalendarDAO.save(result);
            }).then(refresh);
        };

        this.deleteRow = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html', backdrop: 'static', keyboard: false
            });
            modalInstance.result.then(function ()
            {
                CalendarDAO.remove(id).then(refresh);
            });
        };

        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendar/editOrCreateModal.tpl.html',
                controller: 'addGroup',
                size: 'md',
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
        this.addLine = function ()
        {
            var row = {nameCalendar: selected.name};
            var modalInstance = $modal.open({
                controller: 'calendarLineController',
                controllerAs: 'modal',
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendarLine/editOrCreateModal.tpl.html',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            var variable = {};
            modalInstance.result.then(function (result)
            {
                angular.extend(variable, result);
                variable.startTime = moment(variable.startTime).format('HH:mm:ss');
                variable.endTime = moment(variable.endTime).format('HH:mm:ss');
                return CalendarLineDAO.save(selected.id, variable);
            }).then(function ()
            {
                refreshLine(selected.id);
            });
        };
        refresh();
    }

    angular.module('evoReports').controller('calendarController', ['$modal', '$scope', 'CalendarDAO', 'CalendarLineDAO', CalendarController]);
})();