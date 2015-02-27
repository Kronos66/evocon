( function()
{
    'use strict';
    angular.module( 'evoReports' ).factory( 'teamsDAO', [ '$resource', function( $resource ) {
        var api = $resource( '/rest/v1/teams/:id', { id: '@id' }, {
            query: { method: 'GET', isArray: true },
            'get': { method: 'GET' },
            create: { method: 'POST' },
            update: { method: 'PUT' },
            'delete': { method: 'DELETE' }
        } );

        return {
            query: function () {
                return api.query().$promise;
            },
            create: function( data ) {
                return api.create( data ).$promise;
            },
            update: function( data ) {
                return api.update( data ).$promise;
            },
            'delete': function( id ) {
                return api.delete( { id: id } ).$promise;
            },
            'get': function( id ) {
                return api.get( { id: id } ).$promise;
            }
        };

    } ] );
})();
