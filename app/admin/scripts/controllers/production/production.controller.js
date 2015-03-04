(function ()
{
    'use strict';
    angular.module('evoReports').controller('productionController', ['productionDAO', function (productionDAO)
    {
        var PC = this;

        PC.save = function ()
        {
            console.log('ghf');
            productionDAO.update(PC.settings);
        };


        productionDAO.get().then(function (data)
        {
            PC.settings = data;
        });

    }]);

})();