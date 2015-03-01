( function ()
{
    'use strict';
    angular.module( 'evoReports' ).factory( 'operatorsDAO', [ '$resource', function( $resource )
    {
        var api = $resource( '/EvoconReportingServer/rest/v1/operators/:id', { id: '@id' }, {
            create: { method: 'POST' },
            update: { method: 'PUT' },
            'delete': { method: 'DELETE' },
            'get': { method: 'GET' },
            query: { method: 'GET', isArray: true }
        } );

        return {
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
            },
            query: function() {
                return api.query().$promise;
            }
        };
    }]);

})();
