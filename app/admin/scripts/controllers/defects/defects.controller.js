(function ()
{
    'use strict';
    function DefectsController($modal, DefectsDAO, DefectsGroupDAO, StationDefectDAO)
    {
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="grid.appScope.defectsCtrl.editRow(row.entity)">{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.defectsCtrl.deleteRow(row.entity.id)">{{\'delete\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.defectsCtrl.stationRow(row.entity.id)">{{\'stations\'|translate}}</a></span>';
        var ctrl = this;
        var refresh = function ()
        {
            DefectsDAO.query().then(function (result)
            {
                ctrl.defects = result;
                return DefectsGroupDAO.query();
            }).then(function (result)
            {
                ctrl.defects = ctrl.defects.map(function (element)
                {
                    for (var i = 0; i < result.length; i++) {
                        if (element.groupId === result[i].id) {
                            element.nameGroup = result[i].name;
                        }
                    }
                    return element;
                });
            });
        };
        this.gridOptions = {
            enableRowHashing: false,
            data: 'defectsCtrl.defects',
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableRowHeaderSelection: false,
            columnDefs: [{
                             field: 'name',
                             displayName: 'Name'
                         },
                         {
                             field: 'nameGroup',
                             displayName: 'Group'
                         },
                         {
                             headerCellClass: 'actions-header',
                             cellClass: 'actions-column more-actions',
                             maxWidth: 120,
                             field: ' ',
                             cellTemplate: actionsTemplate,
                             enableSorting: false,
                             enableHiding: false
                         }]
        };
        this.newGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defectsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'addGroup',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(DefectsGroupDAO.save).then(refresh);
        };
        this.deleteRow = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/confirmModal.tpl.html', backdrop: 'static', keyboard: false
            });
            modalInstance.result.then(function ()
            {
                DefectsDAO.remove(id).then(refresh);
            });
        };
        this.addRow = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalDefectsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(function (result)
            {
                result.createdDate = result.createdDate.getTime();
                return DefectsDAO.save(result);
            }).then(refresh);
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalDefectsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });

            modalInstance.result.then(function (result)
            {
                result.createdDate = result.createdDate.getTime();
                return DefectsDAO.update(result);
            }).then(refresh);
        };
        this.mergeDefects = function ()
        {
            var modalInstance = $modal.open({
                size: 'lg',
                templateUrl: 'admin/views/defects/mergeModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalMergeDefectsDefects',
                controllerAs: 'modal'
            });
            modalInstance.result.then(DefectsDAO.merge).then(refresh);
        };
        function saveStation(id, stationToSave)
        {
            if (0 < stationToSave.length) {
                stationToSave[0].defectId = id;
                StationDefectDAO.save(stationToSave[0]).then(function ()
                {
                    stationToSave.splice(0, 1);
                    saveStation(id, stationToSave);
                });
            } else if (0 === stationToSave.length) {
                refresh();
            } else {
                throw Error('NOT all stations saved.');
            }
        }

        this.stationRow = function (id)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/defectsStationModal.tpl.html',
                size: 'lg',
                controller: 'stationListController',
                controllerAs: 'modal',
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.result.then(function (result)
            {
                saveStation(id, result);
            });
        };
        refresh();
    }

    angular.module('evoReports').controller('defectsController', ['$modal', 'DefectsDAO', 'DefectsGroupDAO', 'StationDefectDAO', DefectsController]);
})();