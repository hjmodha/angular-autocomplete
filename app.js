
var myapp = angular.module("demo", ['hmautocomplete']);

myapp.controller('demo',function($scope){

  $scope.items = [{'Name':'India'},{'Name':'USA'},{'Name':'UK'},{'Name':'Pakistan'},{'Name':'Nepal'},{'Name':'China'}];
  $scope.onselect = function(obj){
    console.log(obj);
  }

});
