(function ()
{
    'use strict';
    function EditOrCreateStationController($timeout, $scope, CalendarDAO, station, StationsDAO, StationGroupDAO)
    {
        station.enabled = (station.enabled === 'Yes');
        var ctrl = this;
        var data = [];
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
        this.row = station;
        ctrl.days = [
            {
                id: 1,
                label: 'Monday'
            },
            {
                id: 2,
                label: 'Tuesday'
            },
            {
                id: 3,
                label: 'Wednesday'
            },
            {
                id: 4,
                label: 'Thursday'
            },
            {
                id: 5,
                label: 'Friday'
            },
            {
                id: 6,
                label: 'Saturday'
            },
            {
                id: 7,
                label: 'Sunday'
            }];
        var refreshCalendar = function ()
        {
            page = 0;
            pageUp = 0;
            StationsDAO.queryCalendar(station.stationId).then(function (result)
            {
                ctrl.row.calendarInStation = result || [];
                return CalendarDAO.query();
            }).then(function (result)
            {
                ctrl.listCalendars = result;
                ctrl.row.calendarInStation.map(function (element)
                {
                    var days = [];
                    for (var i = 0; i < result.length; i++) {
                        if (element.calendarId === result[i].id) {
                            element.calendarName = result[i].name;
                        }
                    }
                    for (var j = 0; j < element.days.length; j++) {
                        for (var k = 0; k < ctrl.days.length; k++) {
                            if (parseInt(element.days.substring(j, j + 1)) === ctrl.days[k].id) {
                                days.push({id: parseInt(element.days.substring(j, j + 1)), label: ctrl.days[k].label});
                            }
                        }
                    }
                    element.days = days;
                    return element;
                });
                ctrl.gridCalendarInStation.data = getData(ctrl.row.calendarInStation, page);
                ++page;
            });
        };
        StationGroupDAO.query().then(function (result)
        {
            ctrl.stationGroups = result;
        });

        this.selectedGroup = function (id)
        {
            return id === parseInt(station.stationGroup);
        };
        this.newStation = function ()
        {
            ctrl.row.calendarInStation = ctrl.gridCalendarInStation.data;
            if (!ctrl.row.calendarInStation || 0 === ctrl.row.calendarInStation.length) {
                ctrl.row.calendarInStation = [];
                ctrl.row.calendarInStation.push({stationId: station.stationId, days: []});
            } else {
                var calendarInStation = ctrl.row.calendarInStation[ctrl.row.calendarInStation.length - 1];
                if (calendarInStation.calendarId && calendarInStation.days && calendarInStation.validFrom && calendarInStation.validUntil) {
                    ctrl.errorNew = false;
                    ctrl.row.calendarInStation.push({stationId: station.stationId, days: []});
                } else {
                    $timeout(function ()
                    {
                        ctrl.errorNew = false;
                    }, 3000);
                    ctrl.errorNew = true;
                }

            }
        };
        this.save = function ($close)
        {
            ctrl.row.calendarInStation = ctrl.gridCalendarInStation.data;
            if (0 !== ctrl.row.calendarInStation.length) {
                for (var i = 0; i < ctrl.row.calendarInStation.length; i++) {
                    var calendar = ctrl.row.calendarInStation[i];
                    ctrl.errorSave = !(calendar.calendarId && calendar.days && calendar.validFrom && calendar.validUntil);
                }
            }
            $timeout(function ()
            {
                ctrl.errorSave = false;
            }, 3000);
            if (!ctrl.errorSave) {
                $close(ctrl.row);
            }
        };
        this.daysSettings = {
            smartButtonMaxItems: 1,
            displayProp: 'label',
            idProp: 'id',
            scrollableHeight: '210px',
            scrollable: false,
            showCheckAll: false,
            showUncheckAll: false
        };
        this.placeholderDays = {
            buttonDefaultText: 'Days'
        };
        this.gridCalendarInStation = {
            columnDefs: [{
                             field: 'calendarName',
                             displayName: 'Calendar',
                             cellTemplate: '<select id="calendar" ui-select2="grid.appScope.modal.select2Options" data-ng-model="row.entity.calendarId">\n    <option ng-repeat="calendar in grid.appScope.modal.listCalendars" ng-selected="grid.appScope.modal.selectedCalendar(calendar.id)" value="{{calendar.id}}">\n        {{calendar.name}}\n    </option>\n</select>'
                         },
                         {
                             field: 'days',
                             displayName: 'Days',
                             cellTemplate: '<div ng-dropdown-multiselect options="grid.appScope.modal.days" selected-model="row.entity.days" extra-settings="grid.appScope.modal.daysSettings"  translation-texts="grid.appScope.modal.placeholderDays"></div>'
                         },
                         {
                             field: 'validForm',
                             displayName: 'From',
                             cellTemplate: '<div ng-click="$event.preventDefault();$event.stopPropagation();row.opened=true">\n    <input ng-disabled="true" value="{{row.entity.validFrom|date:\'dd.MM.yyyy\'}}">\n    <input type="text" class="not-visible form-control" datepicker-popup="dd-MM-yyyy" ng-model="row.entity.validFrom" is-open="row.opened"\n           close-text="{{\'cancel\'|translate}}"/>\n</div>'
                         },
                         {
                             field: 'until',
                             displayName: 'Until',
                             cellTemplate: '<div ng-click="$event.preventDefault();$event.stopPropagation();row.opened2=true">\n    <input ng-disabled="true" value="{{row.entity.validUntil|date:\'dd.MM.yyyy\'}}">\n    <input type="text" class="not-visible form-control" datepicker-popup="dd-MM-yyyy" ng-model="row.entity.validUntil" is-open="row.opened2"\n           close-text="{{\'cancel\'|translate}}"/>\n</div>'
                         },
                         {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column',
                             maxWidth: 80,
                             enableSorting: false,
                             enableHiding: false,
                             field: 'remove',
                             displayName: '',
                             cellTemplate: '<span class="buttonActions">\n    <a class="button link" ng-click="$event.stopPropagation();grid.appScope.modal.deleteCalendar(row.entity)">\n        {{\'delete\'|translate}}</a>\n</span>'
                         }]
        };
        this.gridCalendarInStation.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                var localData = [];
                StationsDAO.queryCalendar(station.stationId).then(function (result)
                {
                    localData = result || [];
                    return CalendarDAO.query();
                }).then(function (result)
                {
                    ctrl.listCalendars = result;
                    localData.map(function (element)
                    {
                        var days = [];
                        for (var i = 0; i < result.length; i++) {
                            if (element.calendarId === result[i].id) {
                                element.calendarName = result[i].name;
                            }
                        }
                        for (var j = 0; j < element.days.length; j++) {
                            for (var k = 0; k < ctrl.days.length; k++) {
                                if (parseInt(element.days.substring(j, j + 1)) === ctrl.days[k].id) {
                                    days.push({id: parseInt(element.days.substring(j, j + 1)), label: ctrl.days[k].label});
                                }
                            }
                        }
                        element.days = days;
                        return element;
                    });
                    ctrl.gridCalendarInStation.data = ctrl.gridCalendarInStation.data.concat(getData(localData, page));
                    ++page;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                var localData = [];
                StationsDAO.queryCalendar(station.stationId).then(function (result)
                {
                    localData = result || [];
                    return CalendarDAO.query();
                }).then(function (result)
                {
                    ctrl.listCalendars = result;
                    localData.map(function (element)
                    {
                        var days = [];
                        for (var i = 0; i < result.length; i++) {
                            if (element.calendarId === result[i].id) {
                                element.calendarName = result[i].name;
                            }
                        }
                        for (var j = 0; j < element.days.length; j++) {
                            for (var k = 0; k < ctrl.days.length; k++) {
                                if (parseInt(element.days.substring(j, j + 1)) === ctrl.days[k].id) {
                                    days.push({id: parseInt(element.days.substring(j, j + 1)), label: ctrl.days[k].label});
                                }
                            }
                        }
                        element.days = days;
                        return element;
                    });
                    ctrl.gridCalendarInStation.data = getDataUp(localData, pageUp).reverse().concat(ctrl.gridCalendarInStation.data);
                    ++pageUp;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
        };
        this.deleteCalendar = function (calendar)
        {
            ctrl.row.calendarInStation = data;
            if (calendar.id) {
                StationsDAO.removeCalendar({stationId: station.stationId, removeId: calendar.id}).then(refreshCalendar);
            } else {
                ctrl.row.calendarInStation.splice(ctrl.row.calendarInStation.length - 1, 1);
            }
        };
        this.select2Options = {
            width: '100%',
            allowClear: false,
            multiple: true,
            minimumInputLength: 1,
            maximumInputLength: 10,
            initSelection: function ()
            {

            }
        };
        refreshCalendar();
    }

    angular.module('evoReports').controller('editOrCreateStationController',
            ['$timeout', '$scope', 'CalendarDAO', 'station', 'StationsDAO', 'StationGroupDAO', EditOrCreateStationController]);
})();
