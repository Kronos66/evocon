(function ()
{
  'use strict';
  function CommentsController(CommentsDAO, $modal)
  {
    var ctrl = this;

    function refresh()
    {
      CommentsDAO.query().then(function (result)
      {
        ctrl.comments = result;
      });
    }

    this.addRow = function ()
    {
      var row = {};
      var modalInstance = $modal.open({
        templateUrl: 'views/comments/editOrCreateModal.html', controller: 'modalController', controllerAs: 'modal', resolve: {
          row: function ()
          {
            return row;
          }
        }
      });
      modalInstance.result.then(CommentsDAO.save).then(refresh);
    };
    this.editRow = function (row)
    {
      var modalInstance = $modal.open({
        templateUrl: 'views/comments/editOrCreateModal.html', controller: 'modalController', controllerAs: 'modal', resolve: {
          row: function ()
          {
            return row;
          }
        }
      });

      modalInstance.result.then(CommentsDAO.update).then(refresh);
    };
    this.deleteRow = function (id)
    {
      CommentsDAO.remove(id).then(refresh);
    };
    refresh();
  }


  angular.module('evoconApp').controller('commentsController', ['CommentsDAO', '$modal', CommentsController]);
})();
