(function ()
{
  'use strict';
  function CommentsController(CommentsDAO, $modal,CommentsGroupDAO)
  {
    var ctrl = this;

    function refresh()
    {
      CommentsDAO.query().then(function (result)
      {
        ctrl.comments = result;
      });
      CommentsGroupDAO.query().then(function (result)
      {
        ctrl.commentsGroup=result;
      });
    }

    this.newGroup = function ()
    {

    };
    this.addRow = function ()
    {
      var row = {};
      var modalInstance = $modal.open({
        templateUrl: 'admin/views/comments/editOrCreateModal.tpl.html',backdrop:'static',keyboard:false, controller: 'modalController', controllerAs: 'modal', resolve: {
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
        templateUrl: 'admin/views/comments/editOrCreateModal.tpl.html',backdrop:'static',keyboard:false, controller: 'modalController', controllerAs: 'modal', resolve: {
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
    //this.select = function (item)
    //{
    //  var indexOf = selected.indexOf(item);
    //  if (-1 === indexOf) {
    //    item.selected = true;
    //    selected.push(item);
    //    if (2 <= selected.length) {
    //      ctrl.enableMerge = false;
    //    }
    //  } else {
    //    selected.splice(indexOf, 1);
    //    item.selected = false;
    //    if (2 > selected.length) {
    //      ctrl.enableMerge = true;
    //    }
    //  }
    //};

    this.mergeComments = function ()
    {
      var row = {};
      var modalInstance = $modal.open({
        templateUrl: 'admin/views/comments/mergeModal.tpl.html',backdrop:'static',keyboard:false, size: 'lg', controller: 'modalMergeController', controllerAs: 'modal', resolve: {
          row: function ()
          {
            return row;
          }
        }
      });
      modalInstance.result.then(CommentsDAO.save).then(refresh);
    };
    refresh();
  }


  angular.module('evoReports').controller('commentsController', ['CommentsDAO', '$modal','CommentsGroupDAO', CommentsController]);
})();
