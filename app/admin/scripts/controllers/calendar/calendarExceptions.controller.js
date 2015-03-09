(function ()
{
    'use strict';
    function CalendarExceptionController($timeout, calendar, CalendarDAO, CalendarExceptionDAO, StationsDAO)
    {
        var ctrl = this;
        this.calendar = calendar;
        var refresh = function ()
        {
            CalendarExceptionDAO.query(calendar.id).then(function (result)
            {
                ctrl.listExceptions = result.map(function (element)
                {
                    for (var i = 0; i < ctrl.listCalendars.length; i++) {
                        if (element.id === ctrl.listCalendars[i].id) {
                            element.calendarName = ctrl.listCalendars[i].name;
                        }
                    }
                    return element;
                });
            });
        };
        StationsDAO.query().then(function (result)
        {
            ctrl.listStations = result;
            return CalendarDAO.query();
        }).then(function (result)
        {
            ctrl.listCalendars = result;
            return ctrl.listCalendars;
        }).then(refresh);
        this.gridOptions = {
            data: 'exceptions.listExceptions',
            columnDefs: [{
                             field: 'station',
                             displayName: 'Station',
                             cellTemplate: '<select id="station" ui-select2="grid.appScope.exceptions.select2Options" data-ng-model="row.entity.stationId">\n    <option ng-repeat="station in grid.appScope.exceptions.listStations"  value="{{station.stationId}}">\n        {{station.name}}\n    </option>\n</select>'
                         },
                         {
                             field: 'exceptionCalendar',
                             displayName: 'Exc. Calendar',
                             cellTemplate: '<select id="calendar" ui-select2="grid.appScope.exceptions.select2Options" data-ng-model="row.entity.exceptionCalendar">\n    <option ng-repeat="calendar in grid.appScope.exceptions.listCalendars" ng-selected="grid.appScope.exceptions.selectedCalendar(calendar.id)" value="{{calendar.id}}">\n        {{calendar.name}}\n    </option>\n</select>'
                         }, {
                             field: 'start',
                             cellTemplate: '<div ng-click="$event.preventDefault();$event.stopPropagation();row.opened=true">\n    <input ng-disabled="true" value="{{row.entity.startDate|date:\'dd.MM.yyyy\'}}">\n    <input type="text" class="not-visible form-control" datepicker-popup="dd-MM-yyyy" ng-model="row.entity.startDate" is-open="row.opened"\n           datepicker-options="grid.appScope.exceptions.dateOptions" close-text="{{\'cancel\'|translate}}"/>\n</div>',
                             displayName: 'Start date'
                         }, {
                             field: 'end',
                             cellTemplate: '<div ng-click="$event.preventDefault();$event.stopPropagation();row.opened2=true">\n    <input ng-disabled="true" value="{{row.entity.endDate|date:\'dd.MM.yyyy\'}}">\n    <input type="text" class="not-visible form-control" datepicker-popup="dd-MM-yyyy" ng-model="row.entity.endDate" is-open="row.opened2"\n           datepicker-options="grid.appScope.exceptions.dateOptions" close-text="{{\'cancel\'|translate}}"/>\n</div>',
                             displayName: 'End date'
                         }, {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column',
                             displayName: ' ',
                             field: 'remove',
                             enableSorting: false,
                             enableHiding: false,
                             cellTemplate: '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation(); grid.appScope.exceptions.deleteException(row.entity)">{{\'delete\'|translate}}</a></span>'
                         }]
        };
        this.deleteException = function (entity)
        {
            if (entity.id) {
                CalendarExceptionDAO.remove(calendar.id, entity.id).then(refresh);
            } else {
                ctrl.listExceptions.indexOf(entity);
                ctrl.listExceptions.splice(entity, 1);
                refresh();
            }
        };
        this.newException = function ()
        {
            if (0 === ctrl.listExceptions.length) {
                ctrl.listExceptions.push({calendarId: calendar.id});
            } else {
                var exception = ctrl.listExceptions[ctrl.listExceptions.length - 1];
                if (exception.exceptionCalendar && exception.stationId && exception.startDate && exception.endDate) {
                    ctrl.errorNew = false;
                    ctrl.listExceptions.push({calendarId: calendar.id});
                } else {
                    $timeout(function ()
                    {
                        ctrl.errorNew = false;
                    }, 500);
                    ctrl.errorNew = true;
                }
            }
        };
        this.validations = function ($close)
        {
            for (var i = 0; i < ctrl.listExceptions.length; i++) {
                if (!(ctrl.listExceptions[i].calendarId &&
                        ctrl.listExceptions[i].stationId &&
                        ctrl.listExceptions[i].exceptionCalendar &&
                        ctrl.listExceptions[i].startDate &&
                        ctrl.listExceptions[i].endDate)) {
                    ctrl.errorSave = true;
                }
            }
            $timeout(function ()
            {
                ctrl.errorSave = false;
            }, 500);
            if (!ctrl.errorSave) {
                $close(ctrl.listExceptions);
            }
        };
        this.selectedCalendar = function (id)
        {
            return calendar.id === id;
        };
        this.selectedStation = function (id)
        {
            return parseInt(calendar.stationId) === id;
        };
        this.select2Options = {
            allowClear: true,
            multiple: false,
            minimumInputLength: 1,
            maximumInputLength: 10,
            initSelection: function ()
            {
            }
        };
    }

    angular.module('evoReports').controller('calendarExceptionController',
            ['$timeout', 'calendar', 'CalendarDAO', 'CalendarExceptionDAO', 'StationsDAO', CalendarExceptionController]);
})();