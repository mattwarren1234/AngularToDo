'use strict';
angular.module('TodoApp')
.controller('newTodoCtrl', function  ($modalInstance, $scope, $filter){
  this.description = null;
  this.cal = {
    today : $filter('date')(new Date(), 'shortDate'),
    selected : $filter('date')(new Date(), 'shortDate'),
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

  this.save = function () {
    if ($scope.signupForm.due.$valid && $scope.signupForm.description.$valid){
      $modalInstance.close( 
        { Description: this.description, 
          DueDate : $filter('date')(this.cal.selected, 'shortDate'),
          Completed : false
        } );
    }
  };

  this.cancel = function () {
    $modalInstance.dismiss('cancel');
  }; 
});

