'use strict';
angular.module('TodoApp')
.controller('newTodoCtrl', function  ($modalInstance){
  this.description = null;
  this.cal = {
    current : new Date(),
    clear : function(){
      this.date = null;
    },
    open : function($event){
      $event.preventDefault();
      $event.stopPropagation();
      this.opened = true;
    },
    today : new Date(),
    options : {
      startingDay: 1,
      todayHighlight : true,
    }
  };

  this.ok = function () {
    $modalInstance.close();

    // $modalInstance.close(this.selected.item);
  };

  this.cancel = function () {
    $modalInstance.dismiss('cancel');
  }; 
});

