(function ()
{
    'use strict';
    angular.module('evoReports').directive('adminMenu', function ( $location )
    {
        return {
            restrict: 'E', scope:{}, templateUrl: 'admin/views/menu.tpl.html', link: function ( scope, elem )
            {
                scope.$watch( function() {
                    return $location.path();
                }, function( newV ){
                    scope.activePage = newV;
                });

                elem.on( 'mouseover', function() {
                    $( 'body > .content' ).addClass( 'content-narrow' );
                } )
                .on( 'mouseleave', function() {
                    $( 'body > .content' ).removeClass( 'content-narrow' );
                } );

                elem.find( 'span' ).on( 'click', function() {
                    elem.find( '#adminMenu' ).toggleClass( 'static' );
                } );

                scope.setMenuStatic = function() {
                    elem.toggleClass( 'static' );
                    $( 'body > .content' ).toggleClass( 'static' );
                };
            }
        };
    });

})();
