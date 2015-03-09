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
                        } );
            },
            getDetails = function() {
                angular.forEach( ctrl.stations, function( element ) {
                    StationsDAO.get( element.stationId )
                        .then( function( data ) {
                            angular.forEach( ctrl.data, function( val, prop ) {
                                val.push( data.hasOwnProperty( prop ) ? trueFalseOrValue( data[ prop ] ) : '' );
                            } );
                        } );
                } );

            },
            trueFalseOrValue = function( val )
            {
                if( val === true ) {
                    return 'YES';
                }
                else if( val === false ) {
                    return 'NO';
                }

                return val;
            };


        ctrl.data = {
            name: [],
            description: [],
            speedSlowLimit: [],
            lineNumber: [],
            groupId: [],
            markerQty: [],
            colorMode: [],
            speedNormalLimit: [],
            speedTooSlowLimit: [],
            unit: [],
            autoStanby: [],
            effMarkersEnabled: [],
            offFilter: [],
            signalInversion: [],
            stopTime: [],
            enabled: [],
            standbyEnabled: [],
            onFilter: []
        };


        refresh();

    }]);
})();
