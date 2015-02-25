(function ()
{
    'use strict';
    angular.module('evoReports', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.select2', 'pascalprecht.translate','angularSpectrumColorpicker'])
            .config(function ($provide,$translateProvider,$routeProvider,paginationSupportProvider)
    {
        paginationSupportProvider.setDefaultConfig({maxResultsProperty: 'size', firstResultProperty: 'from'});


        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        $routeProvider.when('/', {
            templateUrl: 'admin/views/empty.html', controller: 'commentsController as commentsController'
        }).when('/comments', {
            templateUrl: 'admin/views/comments/comments.tpl.html', controller: 'commentsController as commentsController'
        }).when('/commentsgroup', {
            templateUrl: 'admin/views/commentsGroup/commentsGroup.tpl.html', controller: 'commentsGroupController as groupController'
        }).when('/defects',{
            templateUrl: 'admin/views/defects/defects.tpl.html', controller: 'defectsController as defectsCtrl'
    }).otherwise({
            redirectTo: '/'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.translations('en', {
            'merge': 'Merge',
            'mergeComments':'Merge comments:',
            'addComment': 'New comment',
            'addGroupComment': 'New comment group',
            'addDefect':'Add defect',
            'addGroupDefect':'Add group defect',
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
            'defects':'Defects',
            'description':'Description',
            'controls':'Controls',
            'stations':'Stations',
            'orderIndex':'Order index'
        });
    });


})();
