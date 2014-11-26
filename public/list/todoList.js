'use strict';
angular.module('TodoApp')
  .controller('TodoList', ['todoFactory', '$modal', '$q', '$window', function(todoFactory, $modal, $q, $window){
    this.selectedItems = [];
    this.selectAll = false;

    this.getList = function(){
      this.todos = todoFactory.list.query();
    };
    this.getList();

    this.toggleSelectAll = function(){
      if (this.selectAll){
        this.selectedItems = this.todos.slice(0); 
      } else {
        this.selectedItems = [];
      }
    };
    this.deleteSelected = function(){
      if (!$window.confirm('Delete selected items?')) return;
      var operations = [];
      var instance = this;
      this.selectedItems.forEach(function(item){
        operations.push(todoFactory.item.delete({id : item.Id}));
      });
      $q.all(operations)
        .then(function(){
          instance.getList();
        });
    };
    this.completeSelected = function(){
      this.selectedItems.forEach(function(item){
         todoFactory.item.complete({id : item.Id});
      });
    };


    this.addItem = function () {
      var size = 'sm'; //'lg', 'sm'
      var instance = this;
      var modalInstance = $modal.open({
        size: size,
        templateUrl: 'item/new/newTodo.html',
        controller : 'newTodoCtrl as newTodo'
      });
      modalInstance.result.then(function (newTodo) {
        console.log('item saved!' + newTodo);
        todoFactory.newItem.save(newTodo)
          .$promise.then(function(response) {
            instance.todos.push(response);
          });
      }, function () {
        console.log('modal dismissed?');
      });
    };
    var removeFromArray = function(item, arr){
      var position = arr.indexOf(item);
      if (position > -1) { arr.splice(position, 1); }
    };  

    this.toggleSelected = function () {
      console.log(this.itemSelected);
    };
    this.deleteItem = function(item) {
      //Remove from local list
      removeFromArray(item, this.todos);
      //Delete from server.
      todoFactory.item.delete({id : item.Id})
        .$promise.then(function() {
          //was considering getting the list again....hmm.
          });
    };
    this.updateItem = function (item) {
      todoFactory.item.update({id : item.Id});
    };
    this.itemSelect =function (selected, item) {
      console.log(selected);
      if (selected){
        this.selectedItems.push( item);
      } else {
        removeFromArray(item, this.selectedItems);
      }
    };
  }])
  .directive('todoItem', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            todoData: '=',
            testBind: '=',   
            selected: '=',
            onDelete: '&',
            checked: '=',
            onSelect: '&',
            onComplete: '&',
        },
        templateUrl : "item/todoItem.html",
        controller : function  ($scope) {
          $scope.isChecked = true;
        }
    };
  })
  .factory('todoFactory', ['$http', '$resource', function($http, $resource){
    //CORS IS NOT ENABLED! Post to node server as proxy for now.

    //Need to modify default item resource because 'delete' resource is at different path
    var itemResource = $resource('/api/task/:id');
    itemResource.delete = $resource('/api/task/delete/:id').delete;
    return {
      list : $resource('/api/task/list'),
      item : itemResource,
      newItem : $resource('/api/task/add')
    };
  }]);
