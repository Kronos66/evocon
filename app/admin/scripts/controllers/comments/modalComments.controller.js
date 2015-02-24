(function ()
{
    'use strict';
    function ModalController(CommentsGroupDAO, row)
    {
        var ctrl = this;
        this.groupComments = [];
        row.createdDate = new Date().getTime();
        this.row = row;
        CommentsGroupDAO.query().then(function (result)
        {
            result.text = result.name;
            ctrl.category = result;
        });
        this.selectCategory = function (selectedId)
        {
            return selectedId === parseInt(row.groupId);
        };
        this.select2Options = {
            width:'100%',
            allowClear: true,
            multiple: false,
            minimumInputLength: 1,
            maximumInputLength: 10,
            initSelection: function ()
            {

            }
        };

    }

    angular.module('evoReports').controller('modalCommentsController', ['CommentsGroupDAO', 'row', ModalController]);

})();
