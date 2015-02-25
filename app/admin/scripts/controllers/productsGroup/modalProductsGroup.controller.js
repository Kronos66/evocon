(function ()
{
    'use strict';
    function ModalProductsGroupController(row)
    {
        this.row = row;

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

    angular.module('evoReports').controller('ModalProductsGroupController', ['row', ModalProductsGroupController]);

})();
