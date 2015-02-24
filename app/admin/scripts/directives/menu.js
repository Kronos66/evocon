(function ()
{
    'use strict';
    angular.module('evoReports').directive('adminMenu', function ()
    {
        return {
            restrict: 'E', replace: true, templateUrl: 'admin/views/menu.tpl.html', link: function ()
            {

            }
        };
    });

})();
