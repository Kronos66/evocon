(function ()
{
    'use strict';
    function StationsDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/stations/:id', {id: '@id'}, {
            query: {isArray: true, method: 'GET'},
            update: {method: 'PUT'},
            get: {isArray: false, method: 'GET'}
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
                return api.get({id:id}).$promise;
            },
            update: function (data)
            {
                return api.update(data).$promise;
            },
            remove: function (id)
            {
                return api.remove({id: id}).$promise;
            }
        };
    }

    angular.module('evoReports').factory('StationsDAO', ['$resource', StationsDAO]);
})();