(function ()
{
  'use strict';
  function CommentsController(CommentsDAO, $modal)
  {
    var ctrl = this;
    var selected=[];
    this.toMerge='';
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
        templateUrl: 'admin/views/comments/editOrCreateModal.html', controller: 'modalController', controllerAs: 'modal', resolve: {
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
        templateUrl: 'admin/views/comments/editOrCreateModal.html', controller: 'modalController', controllerAs: 'modal', resolve: {
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
    this.select= function (item)
    {
      var indexOf=selected.indexOf(item);
      if(-1===indexOf){
        selected.push(item);
      }else{
        selected.splice(indexOf,1);
      }
      if(1===selected.length){
        ctrl.toMerge='firstSelected';
      }else{
        ctrl.toMerge='otherSelected';
      }
    };
    this.mergeComments = function ()
    {
      console.log(selected);
    };
    refresh();
  }


  angular.module('evoReports').controller('commentsController', ['CommentsDAO', '$modal', CommentsController]);
})();
