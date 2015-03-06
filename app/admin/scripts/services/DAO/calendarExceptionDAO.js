(function ()
{
    'use strict';
    function CalendarExceptionDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/calendar/:calendarId/exceptions/:id', {calendarId: '@calendarId'}, {
            query: {isArray: true, method: 'GET'},
            update: {method: 'PUT'},
            get: {isArray: false, method: 'GET'}
        });

        return {
            query: function (id)
            {
                return api.query({calendarId: id}).$promise;
            },
            save: function (data)
            {
                return api.save(data).$promise;
            },
            get: function (id)
            {
                return api.get({id: id}).$promise;
            },
            update: function (data)
            {
                return api.update(data).$promise;
            },
            remove: function (calendarId, id)
            {
                return api.remove({calendarId: calendarId, id: id}).$promise;
            }
        };
    }

    angular.module('evoReports').factory('CalendarExceptionDAO', ['$resource', CalendarExceptionDAO]);
})();