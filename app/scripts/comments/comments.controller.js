(function ()
{
  'use strict';
  function CommentsController()
  {
    var comments = [{
                      name: 'Broken', group: 'Technical', typeOfDelay: 'Productive', edit: 'Edit'
                    }, {
                      name: 'Adam', group: 'Technical', typeOfDelay: 'Productive', edit: 'Edit'
                    }, {
                      name: 'Cat', group: 'Technical', typeOfDelay: 'Productive', edit: 'Edit'
                    }];
    this.gridOptions = {
      data: comments,
      enableRowSelection: false,
      multiSelect: false,
      showSelectionCheckbox: false,
      columnDefs: [{field: 'name', name: 'Name'}, {field: 'group', name: 'Group'}, {field: 'typeOfDelay', name: 'Type of Delay'}, {field: 'edit', name: ''}]
    };
  }


  angular.module('evoconApp').controller('commentsController', ['$scope', CommentsController]);
})();
