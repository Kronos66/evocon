(function ()
{
    'use strict';
    function DefectsController($modal,$scope, DefectsDAO, DefectsGroupDAO, StationsDAO)
    {
        var actionsTemplate = '<span class="buttonActions"><a class="button link" ng-click="grid.appScope.defectsCtrl.editRow(row.entity)">{{\'edit\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.defectsCtrl.deleteRow(row.entity.id)">{{\'delete\'|translate}}</a>' +
                '<a class="button link" ng-click="grid.appScope.defectsCtrl.stationRow(row.entity.id)">{{\'stations\'|translate}}</a></span>';
        var ctrl = this;
        var data=[];
        var page = 0;
        var pageUp = 0;
        var getData = function (data, page)
        {
            var res = [];
            for (var i = (page * 20); i < (page + 1) * 20 && i < data.length; ++i) {
                res.push(data[i]);
            }
            return res;
        };

        var getDataUp = function (data, page)
        {
            var res = [];
            for (var i = data.length - (page * 20) - 1; (data.length - i) < ((page + 1) * 20) && (data.length - i) > 0; --i) {
                if (data[i]) {
                    res.push(data[i]);
                }
            }
            return res;
        };
        var refresh = function ()
        {
            page = 0;
            pageUp = 0;
            DefectsDAO.query().then(function (result)
            {
               data = result;
                return DefectsGroupDAO.query();
            }).then(function (result)
            {
                data = data.map(function (element)
                {
                    for (var i = 0; i < result.length; i++) {
                        if (element.groupId === result[i].id) {
                            element.nameGroup = result[i].name;
                        }
                    }
                    return element;
                });
                ctrl.gridOptions.data = getData(data, page);
                ++page;
            });
        };
        this.gridOptions = {
            infiniteScrollPercentage: 10,
            enableRowHashing: false,
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
        this.gridOptions.onRegisterApi = function (gridApi)
        {
            gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
            {
                var data = [];
                DefectsDAO.query().then(function (result)
                {
                    data = result;
                    return DefectsGroupDAO.query();
                }).then(function (result)
                {
                    data = data.map(function (element)
                    {
                        for (var i = 0; i < result.length; i++) {
                            if (element.groupId === result[i].id) {
                                element.nameGroup = result[i].name;
                            }
                        }
                        return element;
                    });
                    ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(data, page));
                    ++page;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
            gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
            {
                var data = [];
                DefectsDAO.query().then(function (result)
                {
                    data = result;
                    return DefectsGroupDAO.query();
                }).then(function (result)
                {
                    data = data.map(function (element)
                    {
                        for (var i = 0; i < result.length; i++) {
                            if (element.groupId === result[i].id) {
                                element.nameGroup = result[i].name;
                            }
                        }
                        return element;
                    });
                    ctrl.gridOptions.data = getDataUp(data, pageUp).reverse().concat(ctrl.gridOptions.data);
                    ++pageUp;
                    gridApi.infiniteScroll.dataLoaded();
                });
            });
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
                StationsDAO.saveDefect(stationToSave[0]).then(function ()
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

    angular.module('evoReports').controller('defectsController', ['$modal','$scope', 'DefectsDAO', 'DefectsGroupDAO', 'StationsDAO', DefectsController]);
})();
