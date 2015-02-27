( function()
{
    'use strict';
    angular.module( 'evoReports' ).controller( 'teamsController', [
        '$scope', '$modal', '$timeout', 'operatorMembershipDAO', 'operatorsDAO', 'teamsDAO',
        function( $scope, $modal, $timeout, operatorMembershipDAO, operatorsDAO, teamsDAO ) {

        var recentlyDragged = [],
            numb = true,
            selectedRow,
            refresh = function () {
                teamsDAO.query()
                    .then( function( data ) {
                        $scope.gridOptions.data = data;
                    } );
            };

        $scope.showDDArea = false;
        $scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            paginationPageSizes: [ 10, 20, 30 ],
            paginationPageSize: 10,
            columnDefs: [
                {
                    field: 'name',
                    displayName: 'Name'
                },
                {
                    field: 'actions',
                    displayName: 'Actions',
                    cellTemplate: '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.editTeam( row.entity )">' +
                        '{{\'edit\'|translate}}</a>' +
                        '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.deleteTeam( row.entity.id )">' +
                        '{{\'delete\'|translate}}</a>'
                }
            ]
        };

        $scope.gridOptions.onRegisterApi = function( gridApi ) {
            gridApi.selection.on.rowSelectionChanged( $scope, function( row ) {
                if( $scope.showDDArea && $scope.recentlySelectedRow === row.entity.name ) {
                    $scope.showDDArea = false;
                    return;
                }

                $scope.recentlySelectedRow = row.entity.name;
                selectedRow = row.entity.id;
                operatorMembershipDAO.query( selectedRow )
                    .then( function( data ) {
                            $scope.membership = data;
                            return operatorsDAO.query();
                    })
                    .then( function( data ) {
                            var temp = $scope.membership.slice(),
                                isMember = false;
                            $scope.othersOperators = [];
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
                                $scope.othersOperators.push( data[ i ] );
                            }

                            $scope.showDDArea = true;
                            $timeout( function() {
                                numb = false;
                            }, 500 );
                    });
            } );
        };

        $scope.newTeam = function() {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/teams/addTeamModal.html',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
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

        $scope.editTeam = function( entity ) {
            var row = angular.extend( {}, entity );
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/teams/editTeamModal.html',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
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

        $scope.deleteTeam = function( entity ) {
            teamsDAO.delete( entity )
                    .then( refresh );
        };

        var changeTeamRejection = function() {
            $timeout( function() {
                var from = ( recentlyDragged.wasMemberArea ) ? $scope.othersOperators : $scope.membership,
                    dest = ( recentlyDragged.wasMemberArea ) ? $scope.membership : $scope.othersOperators;

                for( var i=0; i<from.length; i++ ) {
                    if (from[i] && from[i].id === recentlyDragged.id) {
                        dest.push(from.splice(i, 1));
                    }
                }

            }, 500 );
        };

        $scope.dragged = function( id, area ) {
            recentlyDragged.id = id;
            recentlyDragged.wasMemberArea = area;
        };

        $scope.add = function() {
            if( numb ) {return;}
            operatorMembershipDAO.create( selectedRow, recentlyDragged.id )
                    .catch( changeTeamRejection );
        };

        $scope.remove = function() {
            if( numb ) {return;}
            operatorMembershipDAO.remove( selectedRow, recentlyDragged.id )
                .catch( changeTeamRejection );
        };

        refresh();

    } ] );
})();
