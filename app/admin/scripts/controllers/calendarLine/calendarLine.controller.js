/*globals moment*/
(function ()
{
    'use strict';
    function CalendarLineController(row)
    {
        this.row = row;
        if (row && !row.startTime) {
            this.row.startTime = new Date();
            this.row.endTime = new Date();
        } else {
            this.row.startTime = moment('1970-01-01 ' + this.row.startTime);
            this.row.endTime = moment('1970-01-01 ' + this.row.endTime);
        }
    }

    angular.module('evoReports').controller('calendarLineController', ['row', CalendarLineController]);
})();