'use strict';
angular.module('TodoApp')
  .controller('TodoList', ['todoFactory', '$modal', '$q', '$window', function(todoFactory, $modal, $q, $window){
    this.selectedItems = [];
    this.selectAll = false;
    this.showAll = false;

    // this.sortBySelect = 'DueDate';
    this.getList = function(){
      var instance = this; 
      /*
      * I found a weird bug in the server - if you update a task at a given resource, but Id is not specified in the body, Id will be updated to 0.
      * So - if you update task 123 at /api/tasks/123 BUT Id is not specified in body, task Id will be set to 0.
      * And then the server refuses to update/delete items with id of 0...this is a problem.
      * 
      * I don't have access to fix the server so this is a workaround.
      */ 
      todoFactory.list.query()
        .$promise.then(function removeBadData(data){
          instance.todos = data.filter(function(item){ if (item.Id !== 0) return item; });
        });
    };
    this.getList();

    this.toggleSelectAll = function(selectAll){
      this.selectAll = selectAll;
      if (selectAll){
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
      //Once all server requests are complete, get the server's copy of the list 
      $q.all(operations)
        .then(function onComplete(){
          instance.getList();
          instance.toggleSelectAll(false);
        });
    };

    this.completeSelected = function(){
      var operations = [];
      var instance = this;
      this.selectedItems.forEach(function(item){
        var update = {Id : item.Id, Completed : true, Description : item.Description, DueDate : item.DueDate};
        operations.push(todoFactory.item.update({id : item.Id}, update));
      });
      //Once all server requests are complete, get the server's copy of the list 
      $q.all(operations)
        .then(function onComplete(){
          instance.getList();
          instance.toggleSelectAll(false);
        });
    };

    var defaultModalOptions = function(){
      return {
        size : 'sm',
        templateUrl: 'item/detail/todoDetail.html',
        controller : 'newTodoCtrl as newTodo',
      };
    };
    
    this.editItem = function(itemToEdit){
      var instance = this;
      var modalOptions = defaultModalOptions();
      var updateId = itemToEdit.Id;
      if (updateId === 0) return;
      modalOptions.resolve = { itemToEdit : function () { return itemToEdit; }};
      $modal.open(modalOptions)
        .result.then(function(updatedItem){
          //update local copy
          console.log(updatedItem.Id);
          var update = {
            Id : updateId,
            Description : updatedItem.Description,
            DueDate : updatedItem.DueDate,
            Completed :updatedItem.Completed
          };
          updatedItem.Id = updateId;
          instance.todos.splice(instance.todos.indexOf(itemToEdit), 1, update);
          todoFactory.item.update({id : updateId}, update)
            .$promise.then(function(response){
              console.log(response);
            });
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

    this.completeItem = function(item){
      item.Completed = true;
      var updateInfo = 
        { Id : item.Id, 
          Completed : item.Completed,
          DueDate : item.DueDate,
          Description : item.Description
        };
        todoFactory.item.update({id : item.Id}, updateInfo);
    };

    this.deleteItem = function(item) {
      if (!$window.confirm('Delete item?')) return;
      //Remove from local list
      removeFromArray(item, this.todos);
      //Delete from server.
      todoFactory.item.delete({id : item.Id})
        .$promise.then(function() {
          //was considering getting the list again....hmm.
          });
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

