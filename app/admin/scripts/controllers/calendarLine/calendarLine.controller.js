/*globals moment*/
(function ()
{
    'use strict';
    function CalendarLineController(row)
    {
        var ctrl = this;
        this.opened = false;
        this.row = row;
        if (row && !row.startTime) {
            this.row.startTime = new Date();
            this.row.endTime = new Date();
        } else {
            this.row.startTime = moment('1970-01-01 ' + this.row.startTime);
            this.row.endTime = moment('1970-01-01 ' + this.row.endTime);
        }
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
        this.dateOptions = {
            formatYear: 'yy', startingDay: 1
        };
    }

    angular.module('evoReports').controller('calendarLineController', ['row', CalendarLineController]);
})();