(function ()
{
  'use strict';
  angular.module('evoconApp').directive('adminMenu', function ()
  {
    return {
      restrict: 'E', replace: true, templateUrl: '../../../views/menu.tpl.html', link: function ()
      {

      }
    };
  });

})();
