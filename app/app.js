(function ()
{
    'use strict';

    angular.module('evoReports').run(function ($httpBackend)
    {
        /*globals setupBackendMock*/
        setupBackendMock($httpBackend);
    });


})();
