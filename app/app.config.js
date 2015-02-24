(function ()
{
    'use strict';
    angular.module('evoReports', ['ngRoute', 'ngResource', 'ui.bootstrap','ui.select2']).config(function ($provide, $routeProvider,paginationSupportProvider)
    {
        paginationSupportProvider.setDefaultConfig({maxResultsProperty: 'size', firstResultProperty: 'from'});


        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        $routeProvider.when('/', {
            templateUrl: 'admin/views/empty.html', controller: 'commentsController as commentsController'
        }).when('/comments', {
            templateUrl: 'admin/views/comments/comments.tpl.html', controller: 'commentsController as commentsController'
        }).when('/commentsgroup', {
            templateUrl: 'admin/views/commentsGroup/commentsGroup.tpl.html', controller: 'commentsGroupController as groupController'
        }).otherwise({
            redirectTo: '/'
        });
    });


})();
