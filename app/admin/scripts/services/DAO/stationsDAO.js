(function ()
{
    'use strict';
    function StationsDAO($resource)
    {
        var api = $resource('/rest/v1/stations/:id/:details/:removeId', {id: '@stationId'}, {
            query: {isArray: true, method: 'GET'},
            update: {method: 'PUT'},
            get: {isArray: false, method: 'GET'},
            queryDefects: {isArray: true, method: 'GET', params: {details: 'defects'}},
            saveDefect: {method: 'POST', params: {details: 'defects'}},
            updateDefect: {method: 'PUT', params: {details: 'defects'}},
            removeDefect: {method: 'DELETE', params: {details: 'defects'}}
            //queryCalendar: {isArray: true, method: 'GET', params: {details: 'calendars'}},
            //saveCalendar: {method: 'POST', params: {details: 'calendars'}},
            //updateCalendar: {method: 'PUT', params: {details: 'calendars'}},
            //removeCalendar: {method: 'DELETE', params: {details: 'calendars'}}
        });
        var originalApi = $resource('/EvoconReportingServer/rest/v1/stations/:id/:details/:removeId', {id: '@stationId'}, {
            queryCalendar: {isArray: true, method: 'GET', params: {details: 'calendars'}},
            saveCalendar: {method: 'POST', params: {details: 'calendars'}},
            updateCalendar: {method: 'PUT', params: {details: 'calendars'}},
            removeCalendar: {method: 'DELETE', params: {details: 'calendars'}}
        });
        return {
            query: function ()
            {
                return api.query().$promise;
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
            remove: function (id)
            {
                return api.remove({id: id}).$promise;
            },
            queryDefects: function ()
            {
                return api.query().$promise;
            },
            saveDefect: function (data)
            {
                return api.save(data).$promise;
            },
            updateDefect: function (data)
            {
                return api.update(data).$promise;
            },
            removeDefect: function (id)
            {
                return api.remove({id: id}).$promise;
            },
            queryCalendar: function (id)
            {
                return originalApi.queryCalendar({id: id}).$promise;
            },
            saveCalendar: function (data)
            {
                return originalApi.saveCalendar(data).$promise;
            },
            updateCalendar: function (data)
            {
                return originalApi.updateCalendar(data).$promise;
            },
            removeCalendar: function (data)
            {
                return originalApi.removeCalendar({id: data.stationId, removeId: data.removeId}).$promise;
            }
        };
    }

    angular.module('evoReports').factory('StationsDAO', ['$resource', StationsDAO]);
})();