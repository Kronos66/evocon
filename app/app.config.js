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
                    templateUrl: 'admin/views/teams/teams.html', controller: 'teamsController'
                }).otherwise({
                    redirectTo: '/'
                });

        $translateProvider.preferredLanguage('en');
        $translateProvider.translations('en', {
            'merge': 'Merge',
            'mergeComments': 'Merge comments:',
            'addComment': 'New comment',
            'addGroupComment': 'New comment group',
            'addDefect': 'Add defect',
            'addGroupDefect': 'Add group defect',
            'select': 'Select',
            'name': 'Name',
            'group': 'Group',
            'category': 'Category',
            'color': 'Color',
            'actions': 'Actions',
            'edit': 'Edit',
            'delete': 'Delete',
            'previous': 'Previous',
            'next': 'Next',
            'first': 'First',
            'last': 'Last',
            'negative': 'Negative',
            'save': 'Save',
            'cancel': 'Cancel',
            'commentOrdering': 'Comment ordering',
            'comments': 'Comments',
            'groupComments': 'Group comments',
            'pause': 'Pause',
            'standby': 'Standby',
            'setup': 'Setup',
            'defects': 'Defects',
            'description': 'Description',
            'controls': 'Controls',
            'stations': 'Stations',
            'orderIndex': 'Order index',
            'defectsGroup': 'Defects group',
            'calendar':'Calendar',
            'addProduct': 'Add new Product',
            'addProductGroup': 'Add new Group',
            'editProduct': 'Edit Product',
            'sku': 'Sku',
            'barcode': 'Barcode',
            'enable': 'Enable'
        });
    });


})();
