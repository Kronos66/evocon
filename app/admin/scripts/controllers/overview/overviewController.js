(function ()
{
    'use strict';
    angular.module('evoReports').controller('overviewController', [ 'StationsDAO', function ( StationsDAO )
    {
        var ctrl = this,
            refresh = function() {
                StationsDAO.query()
                    .then( function( data ) {
                            ctrl.stations = data;
                            getDetails();
                            console.log( data );
                        } );
            },
            getDetails = function() {
                angular.forEach(ctrl.stations, function( element ) {
                    StationsDAO.get( element.stationId )
                        .then( function( data ) {
                                console.log( data );
                            element.details = data;
                        } );
                } );
                console.log( ctrl.stations );
            };



        refresh();

    }]);
})();
