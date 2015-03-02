(function ()
{
    'use strict';
    function StationGroupController($modal)
    {
        this.addStation= function ()
        {
            var modalInstance=$modal.open({
                templateUrl:'admin/views/stationGroup/editOrCreateModal.tpl.html'
            });
        };
    }

    angular.module('evoReports').controller('stationGroupController', ['$modal',StationGroupController]);
})();