'use strict';
angular.module('ToDoApp', ['ngResource'])
  .controller('ToDoCtrl', ['toDoFactory', function(toDoFactory){
    this.todos = toDoFactory.list.query();
    this.selectAll = false;
    // console.log(toDoFactory.item.query({id:1}));
    // console.log(toDoFactory.list.get());
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
        templateUrl : 'todoItem.html'
        // template: '<div>{{todoData.due}}{{todoData.text}}{{todoData.completed}}</div>',
        // controller: controllerFunction, //Embed a custom controller in the directive
        // link: function ($scope, element, attrs) { } //DOM manipulation
    };
  })
  .factory('toDoFactory', ['$http', '$resource', function($http, $resource){
    //CORS IS NOT ENABLED!
    //Post to server as proxy for now.
    return {
      list : $resource('/api/task/list'),
      item : $resource('/api/task/:id'),
    };
  }]);

