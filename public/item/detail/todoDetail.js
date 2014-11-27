'use strict';
angular.module('TodoApp')
.controller('newTodoCtrl', function  ($modalInstance, $scope, $filter, itemToEdit){
  
  var isNewItem =   (itemToEdit === null || itemToEdit === undefined);
  this.description =  isNewItem ? '' : itemToEdit.Description;
  this.title =        isNewItem ? 'Create new task' : 'Edit task';
  this.completed =    isNewItem ? false : itemToEdit.Completed;
  var selectedDate =  isNewItem ? new Date() : itemToEdit.DueDate;
  var minDate =       isNewItem ? new Date() : itemToEdit.DueDate;

  this.cal = {
    minDate : $filter('date')(minDate, 'shortDate'),
    selected : $filter('date')(selectedDate, 'shortDate'),
    clear : function(){
      this.date = null;
    },
    open : function($event){
      $event.preventDefault();
      $event.stopPropagation();
      this.opened = true;
    },
    format : 'shortDate',
    options : {
      startingDay: 1,
      formatYear: 'yy',
      showWeeks : 'false',
      todayHighlight : true,
    }
  };

  this.toggleComplete = function(){
    console.log
  };

  this.save = function () {
    console.log('this.save');
    if ($scope.signupForm.due.$valid && $scope.signupForm.description.$valid){
      $modalInstance.close( 
        { Description: this.description, 
          DueDate : $filter('date')(this.cal.selected, 'shortDate'),
          Completed : this.completed
        } );
    }
  };

  this.cancel = function () {
    $modalInstance.dismiss('cancel');
  }; 
});
