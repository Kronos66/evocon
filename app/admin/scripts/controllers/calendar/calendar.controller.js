/*globals moment*/
(function ()
{
    'use strict';

    function CalendarController($modal, $scope, CalendarDAO, CalendarExceptionDAO, CalendarLineDAO)
    {
        var ctrl = this;
        var selected;
        var pageCalendar = 0;
        var pageLine = 0;
        var pageUpCalendar = 0;
        var pageUpLine = 0;
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
            pageCalendar = 0;
            pageUpCalendar = 0;
            CalendarDAO.query().then(function (result)
            {
                ctrl.calendarGrid.data = getData(result, pageCalendar);
                ++pageCalendar;
            });
        };

        var refreshLine = function (id)
        {
            pageLine = 0;
            pageUpLine = 0;
            CalendarLineDAO.query(id).then(function (result)
            {
                angular.forEach(result, function (calendarLine)
                {
                    calendarLine.startTime = moment('1970-01-01 ' + calendarLine.startTime).format('HH:mm');
                    calendarLine.endTime = moment('1970-01-01 ' + calendarLine.endTime).format('HH:mm');
                });
                ctrl.linesGrid.data = getData(result, pageLine);
                ++pageLine;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.addException(row.entity)">Exceptions</a></span>';
        this.calendarGrid = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            infiniteScrollPercentage: 10,
            multiSelect: false,
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
        this.calendarGrid.onRegisterApi = function (calendarApi)
        {
            var data = null;
            calendarApi.selection.on.rowSelectionChanged($scope, function (row)
            {

                refreshLine(row.entity.id);
                var actionsTemplate2 = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editLine(row.entity)">' +
                        '{{\'edit\'|translate}}</a>' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteLine(row.entity.id)">' +
                        '{{\'delete\'|translate}}</a></span>';
                if (data !== row) {
                    data = row;
                    pageLine = 0;
                    pageUpLine = 0;
                    selected = row.entity;
                    ctrl.visible = true;
                    ctrl.linesGrid = {
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
                    ctrl.linesGrid.onRegisterApi = function (lineApi)
                    {
                        lineApi.infiniteScroll.on.needLoadMoreData($scope, function ()
                        {
                            CalendarLineDAO.query(row.entity.id).then(function (result)
                            {
                                angular.forEach(result, function (calendarLine)
                                {
                                    calendarLine.startTime = moment('1970-01-01 ' + calendarLine.startTime).format('HH:mm');
                                    calendarLine.endTime = moment('1970-01-01 ' + calendarLine.endTime).format('HH:mm');
                                });
                                ctrl.linesGrid.data = ctrl.linesGrid.data.concat(getData(result, pageLine));
                                ++pageLine;
                                calendarApi.infiniteScroll.dataLoaded();
                            });
                        });
                        lineApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
                        {
                            CalendarLineDAO.query(row.entity.id).then(function (result)
                            {
                                angular.forEach(result, function (calendarLine)
                                {
                                    calendarLine.startTime = moment('1970-01-01 ' + calendarLine.startTime).format('HH:mm');
                                    calendarLine.endTime = moment('1970-01-01 ' + calendarLine.endTime).format('HH:mm');
                                });
                                ctrl.linesGrid.data = getDataUp(result, pageUpLine).reverse().concat(ctrl.linesGrid.data);
                                ++pageUpLine;
                                lineApi.infiniteScroll.dataLoaded();
                            });
                        });
                    };
                } else {
                    ctrl.visible = false;
                    data = null;
                }
            });
            calendarApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                CalendarDAO.query().then(function (result)
                {
                    ctrl.calendarGrid.data = ctrl.calendarGrid.data.concat(getData(result, pageCalendar));
                    ++pageCalendar;
                    calendarApi.infiniteScroll.dataLoaded();
                }).catch(function ()
                {
                    calendarApi.infiniteScroll.dataLoaded();
                });

            });
            calendarApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                CalendarDAO.query().then(function (result)
                {
                    ctrl.calendarGrid.data = getDataUp(result, pageUpCalendar).reverse().concat(ctrl.calendarGrid.data);
                    ++pageUpCalendar;
                    calendarApi.infiniteScroll.dataLoaded();
                }).catch(function ()
                {
                    calendarApi.infiniteScroll.dataLoaded();
                });

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
                    // TODO   temporary because back-edn respond 405.....
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
            ['$modal', '$scope', 'CalendarDAO', 'CalendarExceptionDAO', 'CalendarLineDAO', CalendarController]);
})();
