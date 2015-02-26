( function()
{
    'use strict';
    angular.module( 'evoReports' ).controller( 'teamsController', [
        '$scope', 'teamsDAO', 'operatorsDAO', 'operatorMembershipDAO', '$modal',
        function( $scope, teamsDAO, operatorsDAO, operatorMembershipDAO, $modal ) {
        $scope.showDDArea = false;
        $scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            paginationPageSizes: [ 10 ],
            paginationPageSize: 10,
            columnDefs: [
                {
                    field: 'name',
                    displayName: 'Name'
                },
                {
                    field: 'count',
                    displayName: 'Count'
                }
            ]
        };

        $scope.gridOptions.onRegisterApi = function( gridApi ) {
            gridApi.selection.on.rowSelectionChanged( $scope, function( row ) {
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
                    });
            } );
        };

        $scope.newTeam = function()
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/teams/addTeamModal.html',
                backdrop: 'static',
                keyboard: false,
                size: 'lg',
                controller: 'newTeamModalController',
                controllerAs: 'NTMC'
            });
            modalInstance.result.then(CommentsDAO.merge).then(refresh);
        };

        teamsDAO.query()
            .then( function( data ) {
                    $scope.gridOptions.data = data;
                } );

    } ] );
})();