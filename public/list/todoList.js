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
        .then(function onComplete(){
          instance.getList();
          instance.selectedItems = [];
        });
    };

    this.completeSelected = function(){
      var operations = [];
      var instance = this;
      this.selectedItems.forEach(function(item){
         operations.push(todoFactory.item.update({id : item.Id}));
      });
      $q.all(operations)
        .then(function onComplete(){
          instance.getList();
          instance.selectedItems = [];
        });

    };
    var defaultModalOptions = function(){
      return {
        size : 'sm',
        templateUrl: 'item/new/newTodo.html',
        controller : 'newTodoCtrl as newTodo',
      };
    };
    
    this.editItem = function(itemToEdit){
      var instance = this;
      var modalOptions = defaultModalOptions();
      modalOptions.resolve = { itemToEdit : function () { return itemToEdit; }};
      $modal.open(modalOptions)
        .result.then(function(updatedItem){
          console.log('item updated!');
          //update local copy
          instance.todos.splice(instance.todos.indexOf(itemToEdit), 1, updatedItem);
          todoFactory.item.update({id : updatedItem.Id, details : updatedItem});
        });
    };

    this.addItem = function () {
      var instance = this;
      var modalOptions = defaultModalOptions();
      modalOptions.resolve =  { itemToEdit : null };
      $modal.open(modalOptions)
        .result.then(function (newTodo) {
          todoFactory.newItem.save(newTodo)
            .$promise.then(function(response) {
              instance.todos.push(response);
        });
      });
    };

    var removeFromArray = function(item, arr){
      var position = arr.indexOf(item);
      if (position > -1) { arr.splice(position, 1); }
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
  }]);

