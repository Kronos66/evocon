(function ()
{
    'use strict';
    function CalendarExceptionController(calendar, CalendarDAO, StationsDAO)
    {
        var ctrl = this;
        this.calendar = calendar;
        StationsDAO.query().then(function (result)
        {
            ctrl.listStations = result;
            return CalendarDAO.query();
        }).then(function (result)
        {
            ctrl.listCalendars = result;
        });
        this.selectedCalendar = function (id)
        {
            return calendar.id === id;
        };
        this.selectedStation = function (id)
        {
            return parseInt(calendar.stationId) === id;
        };
        this.select2OptionsCalendar = {
            allowClear: true,
            multiple: false,
            minimumInputLength: 1,
            maximumInputLength: 10,
            initSelection: function ()
            {
                console.log('init');
            }
        };
        this.open = function ($event)
        {
            $event.preventDefault();
            $event.stopPropagation();
            ctrl.opened = true;
        };
        this.open2 = function ($event)
        {
            $event.preventDefault();
            $event.stopPropagation();
            ctrl.opened2 = true;
        };
        this.select2OptionsStations = {
            allowClear: true,
            multiple: false,
            minimumInputLength: 1,
            maximumInputLength: 10,
            initSelection: function ()
            {
                console.log('init');
            }
        };
    }

    angular.module('evoReports').controller('calendarExceptionController', ['calendar', 'CalendarDAO', 'StationsDAO', CalendarExceptionController]);
})();