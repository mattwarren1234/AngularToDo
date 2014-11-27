'use strict';
angular.module('TodoApp')
  .factory('todoFactory', ['$http', '$resource', function($http, $resource){
    //CORS IS NOT ENABLED! Post to node server as proxy for now.

    //Need to modify default item resource because 'delete' resource is at different path
    var itemResource = $resource('/api/task/:id',
      null,
      { update : {method : 'PUT'} }
    );
    itemResource.delete = $resource('/api/task/delete/:id').delete;
    return {
      list : $resource('/api/task/list'),
      item : itemResource,
      newItem : $resource('/api/task/add')
    };
  }]);