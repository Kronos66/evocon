(function ()
{
  'use strict';

  angular.module('evoconApp', ['ngRoute', 'ngResource', 'ui.bootstrap']).config(function ($provide, $routeProvider)
    {
      $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);

      $routeProvider.when('/', {
        templateUrl: 'views/comments/comments.tpl.html', controller: 'commentsController as commentsController'
      }).when('/comments', {
        templateUrl: 'views/comments/comments.tpl.html', controller: 'commentsController as commentsController'
      }).otherwise({
        redirectTo: '/'
      });
    });


})();
