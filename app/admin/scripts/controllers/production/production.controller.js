(function ()
{
    'use strict';
    angular.module('evoReports').controller('productionController', ['productionDAO', function (productionDAO)
    {
        var PC = this;

        PC.save = function ()
        {
            productionDAO.update(PC.settings).then(function ()
                    {

                    });
        };


        productionDAO.get().then(function (data)
        {
            PC.settings = data;
        });

    }]);

})();