(function ()
{
    'use strict';

    function ProductsGroupDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/productgroups/:id/:action', {id: '@id'}, {
            query: {isArray: true, method: 'GET'},
            get: {isArray: false, method: 'GET'},
            update: {method: 'PUT'},
            getProducts: {isArray: true, method: 'GET', params: {action: 'products'}}
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
            },
            getProducts: function (id)
            {
                return api.getProducts({id: id}).$promise;
            }
        };
    }

    angular.module('evoReports').factory('ProductsGroupDAO', ['$resource', ProductsGroupDAO]);
})();
