(function ()
{
    'use strict';
    angular.module('evoReports').directive('adminMenu', function ()
    {
        return {
            restrict: 'E', replace: true, templateUrl: 'admin/views/menu.tpl.html', link: function ( scope, elem )
            {
                elem.on( 'mouseover', function() {
                    $( 'body > .content' ).addClass( 'content-narrow' );
                } )
                .on( 'mouseleave', function() {
                    $( 'body > .content' ).removeClass( 'content-narrow' );
                } );
            }
        };
    });

})();
