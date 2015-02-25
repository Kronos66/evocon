(function ()
{
    'use strict';
    function DefectsController($modal,DefectsDAO,DefectsGroupDAO,paginationSupport){
        var ctrl = this;
        this.filter = {query: null, size: 10};
        this.listFilter = {size: 10};
        this.currentPage = 1;
        var refresh = paginationSupport(ctrl.filter, function (callback)
        {
            DefectsDAO.query().then(function (result)
            {
                ctrl.defects = result;
                ctrl.resultCount = result.length;
                callback(result.length);
            });
        });
        this.newGroup = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/commentsGroup/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalGroupCommentsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });

            modalInstance.result.then(DefectsGroupDAO.save).then(refresh);
        };
        this.deleteRow = function (id)
        {
            DefectsDAO.remove(id).then(refresh);
        };
        this.addRow = function ()
        {
            var row = {};
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalDefectsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return row;
                    }
                }
            });
            modalInstance.result.then(DefectsDAO.save).then(refresh);
        };
        this.editRow = function (row)
        {
            var modalInstance = $modal.open({
                templateUrl: 'admin/views/defects/editOrCreateModal.tpl.html',
                backdrop: 'static',
                keyboard: false,
                controller: 'modalDefectsController',
                controllerAs: 'modal',
                resolve: {
                    row: function ()
                    {
                        return angular.extend({}, row);
                    }
                }
            });

            modalInstance.result.then(function (result)
            {
                result.groupComments = result.groupComments.id;
                DefectsDAO.update(result);
            }).then(refresh);
        };
        this.stationRow= function (id)
        {

        };
        refresh();
    }
    angular.module('evoReports').controller('defectsController',['$modal','DefectsDAO','DefectsGroupDAO','paginationSupport',DefectsController]);
})();