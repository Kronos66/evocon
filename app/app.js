(function ()
{
  'use strict';

  angular.module('evoReports', ['ngRoute', 'ngResource', 'ui.bootstrap']).config(function ($provide, $routeProvider)
    {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

      $routeProvider.when('/', {
        templateUrl: 'admin/views/comments/empty.html', controller: 'commentsController as commentsController'
      }).when('/comments', {
        templateUrl: 'admin/views/comments/comments.tpl.html', controller: 'commentsController as commentsController'
      }).otherwise({
        redirectTo: '/'
      });
    });


})();
