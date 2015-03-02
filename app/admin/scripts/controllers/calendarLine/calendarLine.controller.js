(function ()
{
    'use strict';
    function CalendarLineController()
    {
        var ctrl = this;
        this.opened = false;
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
            formatYear: 'yy',
            startingDay: 1
        };
    }

    angular.module('evoReports').controller('calendarLineController', [CalendarLineController]);
})();