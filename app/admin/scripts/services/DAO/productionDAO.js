(function()
{
    'use strict';
    angular.module( 'evoReports' ).factory( 'productionDAO', [ '$resource', function ( $resource ) {
        var DAO = $resource( '/rest/v1/lineviewsettings', null, {
            update: { method: 'PUT' },
            get: { method: 'GET' }
        } );

        return {
            update: function( data ) {
                return DAO.update( data ).$promise;
            },
            get: function() {
                return DAO.get().$promise;
            }
        };
    } ] );
})();