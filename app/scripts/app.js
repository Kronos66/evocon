'use strict';


angular.module('evoconApp', ['ngCookies', 'ngResource', 'ngRoute']).config(function ($routeProvider)
  {
    $routeProvider.when('/', {
        templateUrl: 'views/comments.tpl.html', controller: 'commentsController as comments'
      }).when('/about', {
        templateUrl: 'views/about.html', controller: 'AboutCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });
