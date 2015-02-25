(function ()
{
    'use strict';
    function ModalMergeController(CommentsDAO)
    {
        var ctrl=this;
        CommentsDAO.query().then(function (result)
        {
            ctrl.commenstToMerge=result;
        });


    }

    angular.module('evoReports').controller('modalMergeController', ['CommentsDAO', ModalMergeController]);
})();
