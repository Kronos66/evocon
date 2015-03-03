(function ()
{
    'use strict';
    function CalendarLineDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/calendar/:id/lines/:idLine', {id: '@id'}, {
            save:{method:'POST',params:{}},
            query: {isArray: true, method: 'GET'},
            remove:{method:'DELETE'},
            update: {method: 'PUT'},
            get: {isArray: false, method: 'GET'}
        });
        return {
            query: function (idCalendar)
            {
                return api.query({id:idCalendar}).$promise;
            },
            save: function (idCalendar,calendarLine)
            {
              return api.save({id:idCalendar},calendarLine).$promise;
            },
            remove: function (idCalendar,idLine)
            {
                return api.remove({id:idCalendar,idLine:idLine}).$promise;
            },
            update: function (idCalendar,line)
            {
                return api.update({id:idCalendar,idLine:line.id},line).$promise;
            },
            get: function (idCalendar,idLine)
            {
                return api.get({id:idCalendar,idLine:idLine}).$promise;
            }
        };
    }

    angular.module('evoReports').factory('CalendarLineDAO', ['$resource', CalendarLineDAO]);
})();