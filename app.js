angular.module("hmautocomplete", [])
.directive('hmAutocomplete',function(){
	return{
		scope :{
			selectedIndex:'=',
      hmSuggestions:'='
		},

		link:function(scope,elem,attr){

      scope.selectedIndex = 0;

			elem.bind("keydown",function (event){

        if(event.keyCode===40){//down key, increment selectedIndex
			       event.preventDefault();
             if( scope.selectedIndex+1 !==  scope.hmSuggestions.length){
                   scope.selectedIndex++;
                   scope.$apply();
             }
  		   }

			   else if(event.keyCode===38){ //up key, decrement selectedIndex
			       event.preventDefault();
             if(scope.selectedIndex-1 !== -1){
                 scope.selectedIndex--;
                 scope.$apply();
             }
			   }

			   else if(event.keyCode===13){ //enter pressed
			       //scope.selectFunction(scope.selectedIndex);
             scope.$apply();
         }
        console.log(scope.selectedIndex);
			});

		}
	};
}).directive('hoverClass', function () {
    return {
        restrict: 'A',
        scope: {
            hoverClass: '@'
        },
        link: function (scope, element) {
            element.on('mouseenter', function() {
                angular.element(document.getElementsByClassName('ngcompleterowactive')).removeClass('ngcompleterowactive');
                element.addClass(scope.hoverClass);
            });
            element.on('mouseleave', function() {
                element.removeClass(scope.hoverClass);
            });
        }
    };
}).controller('demo',function($scope){
	$scope.index = 0;
	$scope.items = [{'Name':'India'},{'Name':'Pakistan'},{'Name':'Nepal'},{'Name':'Bangladesh'}];
});
