angular.module("hmautocomplete", [])
.directive('hmAutocomplete',function(){
	return{
		scope :{
			selectedIndex:'=',
      hmSuggestions:'=',
      hmDropdownid:'@',
      hmSelect:'&'
    },

		link:function(scope,element){

      scope.selectedIndex = 0;

      var elem = angular.element(document.getElementById('autotext'));
      var list = angular.element(document.getElementById(scope.hmDropdownid));

      elem.bind('focus', function(){
        scope.selectedIndex=0;
        scope.$apply();
        list.css('display','block');
      });

      elem.bind('blur',function(){
        list.css('display','none');
      });

			elem.bind("keydown",function (event){


        if(list.css('display') === 'none'){
          list.css('display','block');
        }

        if(event.keyCode===40){//down key, increment selectedIndex
			       event.preventDefault();
             if(scope.selectedIndex+1 !==  scope.hmSuggestions.length){
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

        else if(event.keyCode===13 || event.keyCode===9){ //enter pressed or tab
			       //scope.selectFunction(scope.selectedIndex);
             elem.val(scope.hmSuggestions[scope.selectedIndex].Name);
             list.css('display','none');
             scope.hmSelect(scope.hmSuggestions[scope.selectedIndex]);
             scope.$apply();
        }else if(event.keyCode===27){
          list.css('display','none');
         }
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
    return $sce.trustAsHtml(text);
  }
}).controller('demo',function($scope){

	$scope.items = [{'Name':'India'},{'Name':'Pakistan'},{'Name':'Nepal'},{'Name':'Bangladesh'}];

  $scope.onselect = function(obj){
    console.log(obj);
  }

});
