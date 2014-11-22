angular.module('ToDoApp', [])
  .controller('ToDoCtrl', function(){
    this.todos = [
    ];
    var instance = this;
    (function sampleData(){
       var sampleTodo = {
        due : new Date(),
        text : "take dog to cleaners",
        completed : true
      };
      for (var i = 0; i < 5; i++){
        instance.todos.push(Object.create(sampleTodo));
      }
    })();
  })
  .directive('todoItem', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            todoData: '='       
        },
        templateUrl : 'todoItem.html'
        // template: '<div>{{todoData.due}}{{todoData.text}}{{todoData.completed}}</div>',
        // controller: controllerFunction, //Embed a custom controller in the directive
        // link: function ($scope, element, attrs) { } //DOM manipulation
    };
});