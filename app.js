angular.module("hmautocomplete", [])
.directive('hmAutocomplete',function(){
	return{
		scope :{
			selectedIndex:'=',
      hmSuggestions:'=',
      hmDropdownid:'@'
    },

		link:function(scope,elem,attr){
      scope.selectedIndex = 0;

      elem.bind('focus',function(){
        console.log('focuse');
        angular.element(document.getElementById(scope.hmDropdownid)).show();
      });

      elem.bind('blur',function(){
        console.log('blur');
        angular.element(document.getElementById(scope.hmDropdownid)).show();
      });

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
}).filter('highlight', function($sce) {
  return function(text, phrase) {
    if (phrase)
      text = text.replace(new RegExp('('+phrase+')', 'gi'),'<span class="highlighted">$1</span>');
    console.log(text);
    return $sce.trustAsHtml(text);
  }
}).controller('demo',function($scope){
	$scope.index = 0;
	$scope.items = [{'Name':'India'},{'Name':'Pakistan'},{'Name':'Nepal'},{'Name':'Bangladesh'}];
});
