(function ()
{
    'use strict';

    function ProductsDAO($resource)
    {
        var api = $resource('/rest/v1/products/:id', {id: '@id'}, {
            query: {isArray: true, method: 'GET'},
            get: {isArray: false, method: 'GET'},
            update: {method: 'PUT'}
        });
        return {
            query: function ()
            {
                return api.query().$promise;
            },
            get: function (id)
            {
                return api.get({id:id}).$promise;
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
            }
        };
    }

    angular.module('evoReports').factory('ProductsDAO', ['$resource', ProductsDAO]);
})();
