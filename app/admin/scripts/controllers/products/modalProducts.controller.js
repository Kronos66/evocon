(function ()
{
    'use strict';
    function ModalProductsController(ProductsGroupDAO, row)
    {
        var ctrl = this;
        this.groupProducts = [];
        this.row = row;

        ProductsGroupDAO.query().then(function (result)
        {
            result.text = result.name;
            ctrl.category = result;
        });

        this.selectCategory = function (selectedId)
        {
            return selectedId === parseInt(row.groupId, 10);
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

    angular.module('evoReports').controller('ModalProductsController', ['ProductsGroupDAO', 'row', ModalProductsController]);

})();
