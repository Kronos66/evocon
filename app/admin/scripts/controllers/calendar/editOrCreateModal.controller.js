(function ()
{
    'use strict';
    function EditOrCreateModalController(row)
    {
        this.row=row;
        this.enable=[{id:1,value:'Yes'},{id:0,value:'No'}];
        this.checkSelectedEnabled= function (value)
        {
            return value===row.enabled;
        };
    }

    angular.module('evoReports').controller('editOrCreateModalController', ['row', EditOrCreateModalController]);
})();