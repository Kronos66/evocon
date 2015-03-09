/*globals moment*/
(function ()
{
    'use strict';

    function CalendarController($modal, $scope, CalendarDAO, CalendarExceptionDAO, CalendarLineDAO, StationsDAO)
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
        var refreshExceptions = function (id)
        {
            CalendarExceptionDAO.query(id).then(function (result)
            {
                angular.forEach(result, function (exception)
                {
                    exception.startDate = moment(exception.startDate).format('DD.MM.YYYY');
                    exception.endDate = moment(exception.endDate).format('DD.MM.YYYY');
                    ctrl.dataCalendar.map(function (calendar)
                    {
                        if (exception.exceptionCalendar === calendar.id) {
                            exception.calendarName = calendar.name;
                        }
                    });
                    StationsDAO.query().then(function (result)
                    {
                        result.map(function (element)
                        {
                            if (exception.stationId === element.stationId) {
                                exception.stationName = element.name;
                            }
                        });
                    });
                });
                ctrl.exceptionsInCalendar = result;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.addException(row.entity)">Exceptions</a></span>';
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
                             displayName: 'Date calculation'
                         },
                         {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column more-actions',
                             maxWidth: 200,
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
                refreshExceptions(row.entity.id);
                var actionsTemplate2 = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editLine(row.entity)">' +
                        '{{\'edit\'|translate}}</a>' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteLine(row.entity.id)">' +
                        '{{\'delete\'|translate}}</a></span>';
                if (data !== row) {
                    data = row;
                    selected = row.entity;
                    ctrl.visible = true;
                    ctrl.gridOptions2 = {
                        paginationPageSizes: [10, 20, 30],
                        paginationPageSize: 10,
                        data: 'calendarController.lines',
                        columnDefs: [{
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
                                         headerCellClass: 'actions-header',
                                         cellClass: 'actions-column',
                                         maxWidth: 120,
                                         field: ' ',
                                         cellTemplate: actionsTemplate2,
                                         enableSorting: false,
                                         enableHiding: false
                                     }]
                    };
                    ctrl.exceptionsGrid = {
                        paginationPageSizes: [10, 20, 30],
                        paginationPageSize: 10,
                        data: 'calendarController.exceptionsInCalendar',
                        columnDefs: [{
                                         field: 'id',
                                         displayName: 'Id'
                                     },
                                     {
                                         field: 'stationName',
                                         displayName: 'Station'
                                     },
                                     {
                                         field: 'calendarName',
                                         displayName: 'Exception Calendar'
                                     },
                                     {
                                         field: 'startDate',
                                         displayName: 'Start Date'
                                     }, {
                                         field: 'endDate',
                                         displayName: 'End date'
                                     }]
                    };
                } else {
                    ctrl.visible = false;
                    data = null;
                }
            });
        };

        function saveOrCreateException(exceptions)
        {
            if (0 === exceptions.length) {
                return 'success';
            }
            var exception = exceptions[0];
            exception.startDate = new Date(exception.startDate).getTime();
            exception.endDate = new Date(exception.endDate).getTime();
            if (exception.id) {
                CalendarExceptionDAO.update(exception).then(function ()
                {
                    exceptions.splice(0, 1);
                    saveOrCreateException(exceptions);
                }).catch(function ()
                {
                    //    temporary because back-edn respond 405.....
                    exceptions.splice(0, 1);
                    saveOrCreateException(exceptions);
                });
            } else {
                CalendarExceptionDAO.save(exception).then(function ()
                {
                    exceptions.splice(0, 1);
                    saveOrCreateException(exceptions);
                });
            }
        }

        this.addException = function (calendar)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/calendar/editOrCreateExceptionModal.tpl.html',
                controller: 'calendarExceptionController',
                controllerAs: 'exceptions',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    calendar: function ()
                    {
                        return calendar;
                    }
                }
            });
            modalInstance.result.then(function (result)
            {
                saveOrCreateException(result);
            }).then(function ()
            {
                refresh();
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
            modalInstance.result.then(function (result)
            {
                result.enabled = result.enabled ? 1 : 0;
                return CalendarDAO.update(result);
            }).then(refresh);
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

    angular.module('evoReports').controller('calendarController',
            ['$modal', '$scope', 'CalendarDAO', 'CalendarExceptionDAO', 'CalendarLineDAO', 'StationsDAO', CalendarController]);
})();