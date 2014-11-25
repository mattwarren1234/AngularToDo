'use strict';
angular.module('TodoApp')
.controller('newTodoCtrl', function  ($modalInstance, $scope, $filter){
  this.description = null;
  this.cal = {
    today : $filter('date')(new Date(), 'shortDate'),
    current : $filter('date')(new Date(), 'shortDate'),
    clear : function(){
      this.date = null;
    },
    open : function($event){
      $event.preventDefault();
      $event.stopPropagation();
      this.opened = true;
    },
    format : 'dd-MMMM-yyyy',
    options : {
      startingDay: 1,
      formatYear: 'yy',
      showWeeks : 'false',
      todayHighlight : true,
    }
  };

  this.ok = function () {
    $modalInstance.close( { description: this.description, date : this.cal.today} );
    // $modalInstance.close(this.selected.item);
  };

  this.cancel = function () {
    $modalInstance.dismiss('cancel');
  }; 
});

