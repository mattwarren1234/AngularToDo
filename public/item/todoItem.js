'use strict';
angular.module('TodoApp')
  .directive('todoItem', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            todoData: '=',
            selected: '=',
            onDelete: '&',
            checked: '=',
            onSelect: '&',
            onComplete: '&',
            onEdit: '&'
        },
        templateUrl : "item/todoItem.html",
        controller : function  ($scope) {
          $scope.isChecked = false;
          $scope.isComplete = $scope.todoData.Completed;
          $scope.$watch('checked', function(newCheckedVal){
            $scope.isChecked = newCheckedVal;
          });
          $scope.toggleChecked = function(){
            $scope.isChecked = !$scope.isChecked;
            $scope.onSelect({checked: $scope.isChecked});
          };
          $scope.toggleCompleted = function(){
            $scope.isComplete = !$scope.isComplete;
            $scope.onComplete({completed : $scope.isComplete});
          };
        }
    };
  });