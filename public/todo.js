'use strict';
angular.module('TodoApp', ['ngResource', 'angularModalService'])
  .controller('TodoList', ['todoFactory', 'ModalService', function(todoFactory, ModalService){
    this.todos = todoFactory.list.query();
    this.selectAll = false;
    // console.log(todoFactory.item.query({id:1}));
    // console.log(todoFactory.list.get());
    this.addItem = function () {
      ModalService.showModal({
          templateUrl: 'modal.html',
          controller: "ModalController"
      }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
              // $scope.message = "You said " + result;
          });
        });
    };
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
  .factory('todoFactory', ['$http', '$resource', function($http, $resource){
    //CORS IS NOT ENABLED!
    //Post to server as proxy for now.
    return {
      list : $resource('/api/task/list'),
      item : $resource('/api/task/:id'),
    };
  }]);
