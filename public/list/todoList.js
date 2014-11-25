'use strict';
angular.module('TodoApp')
  .controller('TodoList', ['todoFactory', '$modal', function(todoFactory, $modal){
    this.todos = todoFactory.list.query();
    this.selectAll = false;
    this.addItem = function () {
      var size = 'sm'; //'lg', 'sm'
      var modalInstance = $modal.open({
        size: size,
        templateUrl: 'item/newTodo.html',
        controller : 'newTodoCtrl as newTodo'
      });
      modalInstance.result.then(function (selectedItem) {
        var selected = selectedItem;
        // $scope.selected = selectedItem;
      }, function () {
        // $log.info('Modal dismissed at: ' + new Date());
      });
    };
    this.toggleSelected = function () {
      console.log(this.itemSelected);
    };
    this.deleteItem = function(item) {
    };
    this.updateItem = function (item) {
    };
    this.selectItem =function (data, item) {
      console.log(data);
      console.log(item);
    };
  }])

  .directive('todoItem', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            todoData: '=',   
            selected: '=',
            onDelete: '&',
            onSelect: '&',
            onComplete: '&',
        },
        templateUrl : "item/todoItem.html"
    };
  })
  .factory('todoFactory', ['$http', '$resource', function($http, $resource){
    //CORS IS NOT ENABLED!
    //Post to server as proxy for now.
    return {
      list : $resource('/api/task/list'),
      item : $resource('/api/task/:id'),
    };
  }]);
