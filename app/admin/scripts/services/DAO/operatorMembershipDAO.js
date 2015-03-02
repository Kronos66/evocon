(function ()
{
    'use strict';

    function operatorMembershipDAO($resource)
    {
        var api = $resource('/EvoconReportingServer/rest/v1/teams/:teamId/operators/:operatorId', {
            teamId: '@teamId',
            operatorId: '@operatorId'
        }, {
            query: {isArray: true, method: 'GET'},
            create: {method: 'POST'},
            remove: {method: 'DELETE'}
        });
        return {
            query: function ( teamId )
            {
                return api.query( { teamId: teamId } ).$promise;
            },
            create: function ( teamId, operatorId )
            {
                return api.create( { teamId: teamId, operatorId: operatorId } ).$promise;
            },
            remove: function ( teamId, operatorId )
            {
                return api.remove( { teamId: teamId, operatorId: operatorId } ).$promise;
            }
        };
    }

    angular.module('evoReports').factory('operatorMembershipDAO', ['$resource', operatorMembershipDAO]);
})();
