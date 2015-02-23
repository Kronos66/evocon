(function ()
{
  'use strict';
  function CommentsDAO($resource)
  {
    var api = $resource('/rest/v1/comments/:id', {id: '@id'}, {
      'query': {isArray: true, method: 'GET'},
      update: {method: 'PUT'}
    });
    return {
      query: function ()
      {
        return api.query().$promise;
      },
      save: function (data)
      {
        return api.save(data).$promise;
      },
      update: function (data)
      {
        return api.update(data).$promise;
      },
      remove: function (id)
      {
        return api.remove({id:id}).$promise;
      }
    };
  }

  angular.module('evoconApp').factory('CommentsDAO', ['$resource', CommentsDAO]);
})();
