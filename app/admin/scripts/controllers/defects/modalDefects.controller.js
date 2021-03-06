(function ()
{
    'use strict';
    function ModalController(DefectsGroupDAO, row)
    {
        var ctrl = this;
        this.groupComments = [];
        if (row && !row.createdDate) {
            row.createdDate = new Date();
        }
        this.row = row;
        DefectsGroupDAO.query().then(function (result)
        {
            result.text = result.name;
            ctrl.category = result;
        });
        this.selectCategory = function (selectedId)
        {
            return selectedId === parseInt(row.groupId);
        };
        this.open = function ($event)
        {
            $event.preventDefault();
            $event.stopPropagation();
            ctrl.opened = true;
        };
        this.select2Options = {
            width: '100%', allowClear: true, multiple: false, minimumInputLength: 1, maximumInputLength: 10, initSelection: function ()
            {

            }
        };

    }

    angular.module('evoReports').controller('modalDefectsController', ['DefectsGroupDAO', 'row', ModalController]);
})();