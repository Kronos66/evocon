(function ()
{
    'use strict';
    function StationGroupDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/stationgroup', {id: '@id'}, {
            query: {isArray: true, method: 'GET'},
            update: {method: 'PUT'},
            get: {isArray: false, method: 'GET'}
        });
        return {
            query: function ()
            {
                return api.query().$promise;
            }
        };
    }

    angular.module('evoReports').factory('StationGroupDAO', ['$resource', StationGroupDAO]);
})();