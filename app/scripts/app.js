angular.module('evoconApp', ['ngRoute','ui.grid','ui.grid.selection','ngResource']).config(function ($routeProvider)
{
  'use strict';

  $routeProvider.when('/', {
    templateUrl: 'views/comments.tpl.html', controller: 'commentsController as commentsController'
  }).otherwise({
    redirectTo: '/'
  });
});
