(function ()
{
  'use strict';
  angular.module('evoconApp').run(function ($httpBackend)
  {
    /*globals setupBackendMock*/
    setupBackendMock($httpBackend);
  });


})();
