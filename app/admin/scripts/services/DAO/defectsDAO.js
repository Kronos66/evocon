(function ()
{
    'use strict';

    function defectsDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/defects/:id', {id: '@id'}, {
            query: {isArray: true, method: 'GET'},
            update: {method: 'PUT'},
            merge: {method: 'PUT'}
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
            update: function (data)
            {
                return api.update(data).$promise;
            },
            remove: function (id)
            {
                return api.remove({id: id}).$promise;
            },
            merge: function (data)
            {
                return api.merge(data).$promise;
            }
        };
    }

    angular.module('evoReports').factory('DefectsDAO', ['$resource', defectsDAO]);
})();