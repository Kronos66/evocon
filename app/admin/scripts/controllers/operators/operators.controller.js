( function()
{
  'use strict';
  angular.module( 'evoReports' ).controller( 'operatorsController', [
    '$modal', 'operatorsDAO',
    function( $modal, operatorsDAO ) {

      var ctrl = this,
        refresh = function () {
          operatorsDAO.query()
            .then( function( data ) {
              ctrl.gridOptions.data = data;
            } );
        };

      ctrl.gridOptions = {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        paginationPageSizes: [ 10, 20, 30 ],
        paginationPageSize: 10,
        columnDefs: [
          {
            field: 'firstname',
            displayName: 'First Name'
          },
          {
            field: 'lastname',
            displayName: 'Last Name'
          },
          {
            field: 'barcode',
            displayName: 'Barcode'
          },
          {
            maxWidth: 120,
            field: ' ',
            cellTemplate: '<span class="buttonActions">' +
            '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.opCtrl.editOp( row.entity )">' +
            '{{\'edit\'|translate}}</a>' +
            '<a class="button link" ng-click="$event.stopPropagation();grid.appScope.opCtrl.deleteOp( row.entity.id )">' +
            '{{\'delete\'|translate}}</a>' +
            '</span>'
          }
        ]
      };

      ctrl.newOp = function() {
        var row = {};
        var modalInstance = $modal.open({
          templateUrl: 'admin/views/operators/addOrEditOperatorModal.tpl.html',
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
        modalInstance.result.then(operatorsDAO.create).then(refresh);
      };

      ctrl.editOp = function( entity ) {
        var row = angular.extend( {}, entity );
        var modalInstance = $modal.open({
          templateUrl: 'admin/views/operators/addOrEditOperatorModal.tpl.html',
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
        modalInstance.result.then(operatorsDAO.update).then(refresh);
      };

      ctrl.deleteOp = function( entity ) {
        operatorsDAO.delete( entity )
          .then( refresh );
      };

      refresh();

    } ] );
})();
