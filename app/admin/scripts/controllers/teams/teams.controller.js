(function ()
{
    'use strict';
    angular.module('evoReports').controller('teamsController', [
        '$scope', '$modal', '$timeout', '$filter', 'operatorMembershipDAO', 'operatorsDAO', 'teamsDAO', 'paginationSupport',
        function ($scope, $modal, $timeout, $filter, operatorMembershipDAO, operatorsDAO, teamsDAO, paginationSupport)
        {

            var ctrl = this,
                    recentlyDragged = [],
                    selectedRow;

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
            ctrl.errorMessage = false;

            ctrl.filter = {query: null, size: 10};
            ctrl.listFilter = {size: 10};
            ctrl.currentPage = 1;

            ctrl.search = {
                firstname: '',
                lastname: ''
            };


            var refresh = function ()
            {
                page = 0;
                pageUp = 0;
                teamsDAO.query().then(function (data)
                {
                    ctrl.gridOptions.data = getData(data, page);
                    ++page;
                });
            };

            ctrl.othersOperatorsFiltered = [];
            ctrl.showDDArea = false;
            ctrl.gridOptions = {
                enableRowSelection: true,
                infiniteScrollPercentage: 10,
                enableRowHeaderSelection: false,
                multiSelect: false,
                columnDefs: [
                    {
                        field: 'name',
                        displayName: 'Name'
                    },
                    {
                        headerCellClass: 'actions-header two-columns',
                        cellClass: 'actions-column',
                        enableSorting: false,
                        enableHiding: false,
                        maxWidth: 120,
                        field: ' ',
                        cellTemplate: '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.teamCtrl.editTeam( row.entity )">' +
                        '{{\'edit\'|translate}}</a>' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.teamCtrl.deleteTeam( row.entity.id )">' +
                        '{{\'delete\'|translate}}</a></span>'
                    }
                ]
            };

            ctrl.gridOptions.onRegisterApi = function (gridApi)
            {
                gridApi.selection.on.rowSelectionChanged($scope, function (row)
                {
                    if (ctrl.showDDArea && ctrl.recentlySelectedRow === row.entity.name) {
                        ctrl.showDDArea = false;
                        return;
                    }

                    ctrl.recentlySelectedRow = row.entity.name;
                    selectedRow = row.entity.teamId;
                    operatorMembershipDAO.query(selectedRow)
                            .then(function (data)
                            {
                                ctrl.membership = data;
                                return operatorsDAO.query();
                            })
                            .then(function (data)
                            {
                                var temp = ctrl.membership.slice(),
                                        isMember = false;
                                ctrl.othersOperators = [];
                                for (var i = 0; i < data.length; i++) {
                                    isMember = false;
                                    if (data[i] && temp.length) {
                                        for (var j = 0; j < temp.length; j++) {
                                            if (temp[j].id === data[i].id) {
                                                isMember = true;
                                                temp.splice(j, 1);
                                                break;
                                            }
                                        }
                                    }
                                    if (isMember) {
                                        continue;
                                    }
                                    ctrl.othersOperators.push(data[i]);
                                }

                                ctrl.othersOperatorsFiltered = angular.extend([], ctrl.othersOperators);


                                $scope.$watch(function ()
                                {
                                    return ctrl.search;
                                }, function (newValue)
                                {
                                    ctrl.othersOperatorsFiltered = $filter('filter')(ctrl.othersOperators, newValue);
                                    paginationRefresh();
                                }, true);

                                ctrl.showDDArea = true;

                                paginationRefresh();
                            });
                });
                gridApi.infiniteScroll.on.needLoadMoreData($scope, function ()
                {
                    teamsDAO.query().then(function (data)
                    {
                        ctrl.gridOptions.data = ctrl.gridOptions.data.concat(getData(data, page));
                        ++page;
                        gridApi.infiniteScroll.dataLoaded();
                    });
                });
                gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, function ()
                {
                    teamsDAO.query().then(function (data)
                    {
                        ctrl.gridOptions.data = getDataUp(data, pageUp).reverse().concat(ctrl.gridOptions.data);
                        ++pageUp;
                        gridApi.infiniteScroll.dataLoaded();
                    });
                });
            };

            ctrl.newTeam = function ()
            {
                var row = {};
                var modalInstance = $modal.open({
                    templateUrl: 'admin/views/teams/editOrCreateTeamModal.tpl.html',
                    backdrop: 'static',
                    keyboard: false,
                    size: 'md',
                    controller: 'addGroup',
                    controllerAs: 'modal',
                    resolve: {
                        row: function ()
                        {
                            return row;
                        }
                    }
                });
                modalInstance.result.then(teamsDAO.create).then(refresh);
            };

            ctrl.editTeam = function (entity)
            {
                var row = angular.extend({}, entity);
                var modalInstance = $modal.open({
                    templateUrl: 'admin/views/teams/editOrCreateTeamModal.tpl.html',
                    backdrop: 'static',
                    keyboard: false,
                    size: 'md',
                    controller: 'addGroup',
                    controllerAs: 'modal',
                    resolve: {
                        row: function ()
                        {
                            return row;
                        }
                    }
                });
                modalInstance.result.then(teamsDAO.update).then(refresh);
            };

            ctrl.deleteTeam = function (entity)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'admin/views/confirmModal.tpl.html',
                    backdrop: 'static',
                    keyboard: false
                });
                modalInstance.result.then(function ()
                {
                    teamsDAO.delete(entity).then(refresh);
                });
            };

            var changeTeamRejection = function ()
            {
                ctrl.errorMessage = true;

                var from = ( recentlyDragged.wasMemberArea ) ? ctrl.othersOperatorsFiltered : ctrl.membership,
                        dest = ( recentlyDragged.wasMemberArea ) ? ctrl.membership : ctrl.othersOperatorsFiltered;

                for (var i = 0; i < from.length; i++) {
                    if (from[i] && from[i].id === recentlyDragged.obj.id) {
                        dest.push(from.splice(i, 1)[0]);
                    }
                }

                $timeout(function ()
                {
                    ctrl.errorMessage = false;
                }, 6000);
            };

            var add = function ()
            {
                operatorMembershipDAO.create(selectedRow, recentlyDragged.obj.id)
                        .then(function ()
                        {
                            ctrl.othersOperators.splice(ctrl.othersOperators.indexOf(recentlyDragged.obj), 1);
                            paginationRefresh();
                        })
                        .catch(changeTeamRejection);
            };

            var remove = function ()
            {
                operatorMembershipDAO.remove(selectedRow, recentlyDragged.obj.id)
                        .then(function ()
                        {
                            ctrl.othersOperators.push(recentlyDragged.obj);
                            paginationRefresh();
                        })
                        .catch(changeTeamRejection);
            };

            var receive = function (event, ui)
            {
                recentlyDragged.obj = ui.item.sortable.model;
                recentlyDragged.wasMemberArea = ui.item.sortable.source.attr('id') === 'members';

                if (recentlyDragged.wasMemberArea === true) {
                    remove();
                }
                else if (recentlyDragged.wasMemberArea === false) {
                    add();
                }
            };


            ctrl.sortableOptions = {
                connectWith: '.thumbnail',
                placeholder: 'draggable',
                receive: receive
            };


            var paginationRefresh = paginationSupport(ctrl.filter, function (callback)
            {
                ctrl.resultCount = ctrl.othersOperatorsFiltered.length;
                callback(ctrl.othersOperatorsFiltered.length);
            });

            refresh();

        }]);
})();
