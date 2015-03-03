(function ()
{
    'use strict';
    function CalendarDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/calendar/:id/:comments', {id: '@id'}, {
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
            },
            getComments: function (id)
            {
                return api.query({id: id, comments: 'comments'}).$promise;
            }
        };
    }

    angular.module('evoReports').factory('CalendarDAO', ['$resource', CalendarDAO]);
})();