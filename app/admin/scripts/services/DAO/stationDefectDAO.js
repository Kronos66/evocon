(function ()
{
    'use strict';
    function StationDefectDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/stations/:stationId/defects', {stationId: '@stationId'}, {
            query: {isArray: true, method: 'GET'},
            update: {method: 'PUT'}
        });
        return {
            query: function ()
            {
                return api.query().$promise;
            }, save: function (data)
            {
                return api.save(data).$promise;
            }, update: function (data)
            {
                return api.update(data).$promise;
            }, remove: function (id)
            {
                return api.remove({id: id}).$promise;
            }
        };
    }

    angular.module('evoReports').factory('StationDefectDAO', ['$resource', StationDefectDAO]);
})();