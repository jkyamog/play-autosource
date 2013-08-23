var app = angular.module("app", ["ngResource"])
  .factory('Person', ["$resource", function($resource){
    return $resource('persons/:id', { "id" : "@id" }, {
    	update: {method: 'PUT', params: {id : '@id'}}
    });
  }])
  .controller("PersonCtrl", ["$scope", "Person", function($scope, Person) {

    $scope.createForm = {};
    $scope.persons = Person.query();
    
    var onError = function onError() {
    	alert("error on saving");
    }

    $scope.create = function() {
      var person = new Person({name: $scope.createForm.name, age: $scope.createForm.age});
      person.$save({}, function onSuccess(data){
        $scope.createForm = {};
        $scope.persons.push(data);
      }, onError);
    }

    $scope.remove = function(person) {
      person.$remove({}, function onSuccess() {
    	  $scope.persons.splice($scope.persons.indexOf(person), 1);
      }, onError)
    }

    $scope.update = function(person) {
      person.$update({}, undefined, onError);
    }
}]);
