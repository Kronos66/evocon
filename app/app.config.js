(function ()
{
    'use strict';
    angular.module('evoReports', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.select2', 'pascalprecht.translate']).config(function ($provide,
                                                                                                                                     $translateProvider,
                                                                                                                                     $routeProvider,
                                                                                                                                     paginationSupportProvider)
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
        $translateProvider.preferredLanguage('en');
        $translateProvider.translations('en', {
            'MERGE': 'Merge',
            'ADD.Comment': 'New comment',
            'ADD.GroupComment': 'New comment group',
            'SELECT': 'Select',
            'NAME': 'Name',
            'GROUP': 'Group',
            'CATEGORY': 'Category',
            'COLOR': 'Color',
            'ACTIONS': 'Actions',
            'EDIT': 'Edit',
            'DELETE': 'Delete',
            'PREVIOUS': 'Previous',
            'NEXT': 'Next',
            'FIRST': 'First',
            'LAST': 'Last',
            'NEGATIVE': 'Negative',
            'SAVE': 'Save',
            'CANCEL': 'Cancel',
            'COMMENT.ORDERING': 'Comment ordering',
            'COMMENTS': 'Comments',
            'GROUP.COMMENTS': 'Group comments',
            'PAUSE': 'Pause',
            'STANDBY': 'Standby',
            'SETUP': 'Setup'
        });
    });


})();
