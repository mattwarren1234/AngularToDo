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
    if ($scope.signup_form.due.$valid && $scope.signup_form.description.$valid)
      $modalInstance.close( { description: this.description, date : this.cal.selected} );
  };

  this.cancel = function () {
    $modalInstance.dismiss('cancel');
  }; 
});

