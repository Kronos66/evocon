/*globals moment*/
(function ()
{
    'use strict';

    function CalendarController($modal, $scope, CalendarDAO, CalendarLineDAO)
    {
        var ctrl = this;
        var selected;
        var refresh = function ()
        {
            CalendarDAO.query().then(function (result)
            {
                ctrl.dataCalendar = result;
                angular.forEach(ctrl.dataCalendar, function (element)
                {
                    if (1 === element.enabled) {
                        element.enable = 'Yes';
                    } else {
                        element.enable = 'No';
                    }
                });
            });
        };
        var refreshLine = function (id)
        {
            CalendarLineDAO.query(id).then(function (result)
            {
                ctrl.lines = result;
            });
        };
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editRow(row.entity)">' +
                '{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteRow(row.entity.id)">' +
                '{{\'delete\'|translate}}</a></span>';
        this.gridOptions = {
            enableRowHeaderSelection: false,
            enableRowSelection: true,
            multiSelect: false,
            data: 'calendarController.dataCalendar',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            columnDefs: [{
                             field: 'name', displayName: 'Name'
                         }, {
                             field: 'description', displayName: 'Description'
                         }, {
                             field: 'enable', displayName: 'Enable'
                         }, {
                            maxWidth: 120, field: ' ', cellTemplate: actionsTemplate
                         }]
        };
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            var data;
            gridApi.selection.on.rowSelectionChanged($scope, function (row)
            {
                refreshLine(row.entity.id);
                var actionsTemplate2 = '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.editLine(row.entity)">' +
                        '{{\'edit\'|translate}}</a>' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.calendarController.deleteLine(row.entity.id)">' +
                        '{{\'delete\'|translate}}</a></span>';
                if (data !== row) {
                    data = row;
                    selected = row.entity.id;
                    ctrl.visible = true;
                    ctrl.gridOptions2 = {
                        data: 'calendarController.lines', columnDefs: [{
                                                                           field: 'id', displayName: 'Id line'
                                                                       }, {
                                                                           field: 'startTime', displayName: 'Start time'
                                                                       }, {
                                                                           field: 'endTime', displayName: 'End time'
                                                                       }, {
                                                                           displayName: 'Actions', field: 'remove', cellTemplate: actionsTemplate2
                                                                       }]
                    };
                } else {
                    ctrl.visible = false;
                    data = null;
                }
            });
        };
        this.deleteLine = function (id)
        {
            CalendarLineDAO.remove(selected, id).then(function ()
            {
                refreshLine(selected);
            });
        };
        this.editLine = function (line)
        {
            var modalInstance = $modal.open({
                controller: 'calendarLineController',
                controllerAs: 'modal',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                templateUrl: 'admin/views/calendarLine/editOrCreateModal.tpl.html',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, line);
                    }
                }
            });
            var variable = {};
            modalInstance.result.then(function (result)
            {
                angular.copy(variable, result);
                variable.startTime = moment(result.startTime).format('HH:mm:ss:sss');
                variable.endTime = moment(result.startTime).format('HH:mm:ss:sss');
                return CalendarLineDAO.update(selected, result);
            }).then(function ()
            {
                refreshLine(selected);
            });
        };
        this.addCalendar = function ()
        {
            var modalInstance = $modal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendar/editOrCreateModal.tpl.html',
                controller: 'editOrCreateModalController',
                size: 'md',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({});
                    }
                }
            });
            modalInstance.result.then(CalendarDAO.save).then(refresh);
        };

        this.deleteRow = function (id)
        {
            CalendarDAO.remove(id).then(refresh);
        };

        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendar/editOrCreateModal.tpl.html',
                controller: 'editOrCreateModalController',
                size: 'md',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });
            modalInstance.result.then(CalendarDAO.update).then(refresh);
        };
        this.addLine = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                controller: 'calendarLineController',
                controllerAs: 'modal',
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'admin/views/calendarLine/editOrCreateModal.tpl.html',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            var variable = {};
            modalInstance.result.then(function (result)
            {
                console.log(result);
                angular.copy(variable, result);
                variable.startTime = moment(result.startTime).format('HH:mm:ss:sss');
                variable.endTime = moment(result.startTime).format('HH:mm:ss:sss');
                return CalendarLineDAO.save(selected, result);
            }).then(refresh);
        };
        refresh();
    }

    angular.module('evoReports').controller('calendarController', ['$modal', '$scope', 'CalendarDAO', 'CalendarLineDAO', CalendarController]);
})();