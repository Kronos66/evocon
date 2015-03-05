(function ()
{
    'use strict';

    function startFrom()
    {
        return function (input, start)
        {
            start = +start; //parse to int
            if (input) {
                return input.slice(start);
            } else {
                return input;
            }
        };
    }

    angular.module('evoReports').filter('startFrom', [startFrom]);
})();