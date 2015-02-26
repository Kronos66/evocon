( function()
{
    'use strict';
    angular.module( 'evoReports' ).controller( 'teamsController', [
        '$scope', 'teamsDAO', 'operatorsDAO', 'operatorMembershipDAO', '$modal',
        function( $scope, teamsDAO, operatorsDAO, operatorMembershipDAO, $modal ) {

        var recentlySelectedRow,
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
                if( $scope.showDDArea && recentlySelectedRow == row.entity.id ) {
                    $scope.showDDArea = false;
                    return;
                }

                $scope.showDDArea = true;
                operatorMembershipDAO.query( row.entity.id )
                    .then( function( data ) {
                            $scope.membership = data;
                            return operatorsDAO.query();
                    })
                    .then( function( data ) {
                            var isMember = false;
                            $scope.othersOperators = [];
                            angular.forEach( data, function( opElem ){
                                angular.forEach( $scope.membership, function( memElem ) {
                                    if( opElem.id === memElem.id ) {
                                        isMember = true;
                                        return;
                                    }
                                } );
                                if( !isMember )
                                    $scope.othersOperators.push( opElem );

                                isMember = false;
                            } );

                            console.log($scope.othersOperators);
                            console.log($scope.membership);
                    });
            } );
        };

        $scope.newTeam = function()
        {
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

        $scope.editTeam = function( entity )
        {
            console.log( entity );
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

        $scope.deleteTeam = function( entity )
        {
            teamsDAO.delete( entity )
                    .then( refresh );
        };

        refresh();

    } ] );
})();