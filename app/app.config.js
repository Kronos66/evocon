(function ()
{
    'use strict';
    var module = angular.module('evoReports', ['ngRoute',
                                               'ngResource',
                                               'ui.bootstrap',
                                               'ui.select2',
                                               'pascalprecht.translate',
                                               'angularSpectrumColorpicker',
                                               'ui.grid',
                                               'ui.grid.selection',
                                               'ui.grid.pagination',
                                               'angularMoment',
                                               'ngDragDrop']);
    module.config(function ($provide, $translateProvider, $routeProvider)
    {

        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        $routeProvider.when('/', {
            templateUrl: 'admin/views/empty.html', controller: 'commentsController as commentsController'
        }).when('/comments', {
                    templateUrl: 'admin/views/comments/comments.tpl.html', controller: 'commentsController as commentsController'
                }).when('/commentsgroup', {
                    templateUrl: 'admin/views/commentsGroup/commentsGroup.tpl.html', controller: 'commentsGroupController as groupCtrl'
                }).when('/products', {
                    templateUrl: 'admin/views/products/products.tpl.html',
                    controller: 'ProductsController as productsCtrl'
                }).when('/product/:id', {
                    templateUrl: 'admin/views/products/editOrCreateProduct.tpl.html',
                    controller: 'ProductDetailController as productDetailCtrl'
                }).when('/productsgroup', {
                    templateUrl: 'admin/views/productsGroup/productsGroup.tpl.html',
                    controller: 'ProductsGroupController as groupCtrl'
                }).when('/defects', {
                    templateUrl: 'admin/views/defects/defects.tpl.html', controller: 'defectsController as defectsCtrl'
                }).when('/defectsgroup', {
                    templateUrl: 'admin/views/defectsGroup/defectsGroup.tpl.html', controller: 'defectsGroupController as groupCtrl'
                }).when('/production', {
                    templateUrl: 'admin/views/production/production.tpl.html', controller: 'productionController as PC'
                }).when('/calendar', {
                    templateUrl: 'admin/views/calendar/calendar.tpl.html', controller: 'calendarController as calendarController'
                }).when('/teams', {
                    templateUrl: 'admin/views/teams/teams.tpl.html', controller: 'teamsController as teamCtrl'
                }).when('/operators', {
                    templateUrl: 'admin/views/operators/operators.tpl.html', controller: 'operatorsController as opCtrl'
                }).otherwise({
                    redirectTo: '/'
                });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useStaticFilesLoader({
            prefix: '/resources/',
            suffix: '.json'
        });
    });


})();
