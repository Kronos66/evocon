( function()
{
    'use strict';
    angular.module( 'evoReports' ).controller( 'teamsController', [
        '$scope', '$modal', '$timeout', 'operatorMembershipDAO', 'operatorsDAO', 'teamsDAO',
        function( $scope, $modal, $timeout, operatorMembershipDAO, operatorsDAO, teamsDAO ) {

        var ctrl = this,
            recentlyDragged = [],
            numb = true,
            selectedRow,
            refresh = function () {
                teamsDAO.query()
                    .then( function( data ) {
                        ctrl.gridOptions.data = data;
                    } );
            };

            ctrl.showDDArea = false;
            ctrl.gridOptions = {
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                paginationPageSizes: [ 10, 20, 30 ],
                paginationPageSize: 10,
                columnDefs: [
                    {
                        field: 'name',
                        cellClass: 'classclassclass',
                        displayName: 'Name'
                    },
                    {
                        headerCellClass: 'classclass',
                        cellClass: 'classclass Cclassclass',
                        maxWidth: 120,
                        field: ' ',
                        cellTemplate: '<span class="buttonActions"><a class="button link" ng-click="$event.stopPropagation();grid.appScope.teamCtrl.editTeam( row.entity )">' +
                            '{{\'edit\'|translate}}</a>' +
                            '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.teamCtrl.deleteTeam( row.entity.id )">' +
                            '{{\'delete\'|translate}}</a></span>'
                    }
                ]
        };

        ctrl.gridOptions.onRegisterApi = function( gridApi ) {
            gridApi.selection.on.rowSelectionChanged( $scope, function( row ) {
                if( ctrl.showDDArea && ctrl.recentlySelectedRow === row.entity.name ) {
                    ctrl.showDDArea = false;
                    return;
                }

                ctrl.recentlySelectedRow = row.entity.name;
                selectedRow = row.entity.teamId;
                operatorMembershipDAO.query( selectedRow )
                    .then( function( data ) {
                            ctrl.membership = data;
                            return operatorsDAO.query();
                    })
                    .then( function( data ) {
                            var temp = ctrl.membership.slice(),
                                isMember = false;
                            ctrl.othersOperators = [];
                            for( var i=0; i<data.length; i++ ) {
                                isMember = false;
                                if( data[ i ] && temp.length ) {
                                    for( var j=0; j<temp.length; j++ ) {
                                        if( temp[ j ].id === data[ i ].id ) {
                                            isMember = true;
                                            temp.splice( j, 1 );
                                            break;
                                        }
                                    }
                                }
                                if( isMember ){ continue;}
                                ctrl.othersOperators.push( data[ i ] );
                            }

                            ctrl.showDDArea = true;
                            $timeout( function() {
                                numb = false;
                            }, 500 );
                    });
            } );
        };

        ctrl.newTeam = function() {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/teams/addTeamModal.html',
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

        ctrl.editTeam = function( entity ) {
            var row = angular.extend( {}, entity );
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/teams/editTeamModal.html',
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

        ctrl.deleteTeam = function( entity ) {
            teamsDAO.delete( entity )
                    .then( refresh );
        };

        var changeTeamRejection = function() {
            $timeout( function() {
                var from = ( recentlyDragged.wasMemberArea ) ? ctrl.othersOperators : ctrl.membership,
                    dest = ( recentlyDragged.wasMemberArea ) ? ctrl.membership : ctrl.othersOperators;

                for( var i=0; i<from.length; i++ ) {
                    if (from[i] && from[i].id === recentlyDragged.id) {
                        dest.push(from.splice(i, 1));
                    }
                }

            }, 500 );
        };

        ctrl.dragged = function( id, area ) {
            recentlyDragged.id = id;
            recentlyDragged.wasMemberArea = area;
        };

        ctrl.add = function() {
            if( numb ) {return;}
            operatorMembershipDAO.create( selectedRow, recentlyDragged.id )
                    .catch( changeTeamRejection );
        };

        ctrl.remove = function() {
            if( numb ) {return;}
            operatorMembershipDAO.remove( selectedRow, recentlyDragged.id )
                .catch( changeTeamRejection );
        };

        refresh();

    } ] );
})();
