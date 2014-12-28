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

      list.css('display','none');

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
             if(scope.selectedIndex+1 ===  scope.hmSuggestions.length){
                  scope.selectedIndex = 0;
             }else{
                  scope.selectedIndex++;
             }
             scope.$apply();
         }

			   else if(event.keyCode===38){ //up key, decrement selectedIndex
			       event.preventDefault();

             if(scope.selectedIndex === 0){
                 scope.selectedIndex = scope.hmSuggestions.length-1;
             }else{
                scope.selectedIndex--;
             }

             scope.$apply();

			   }

        else if(event.keyCode===13 || event.keyCode===9){ //enter pressed or tab

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
        link: function (scope,element) {

            element.on('mouseenter', function() {
                angular.element(document.getElementsByClassName('ngcompleterowactive')).removeClass('ngcompleterowactive');
                element.addClass('ngcompleterowactive');
            });

            element.on('mouseleave', function() {
                element.removeClass('ngcompleterowactive');
            });

        }
    };
})

.directive('hmSelectDown',function(){
  return{
    restrict:'A',
    scope:{
      hmSelectDown:'&'
    },
    link:function(scope,elem,attr){
      var list = angular.element(document.getElementById(scope.hmDropdownid));
      elem.bind('click',function(){
        console.log('click handled');
      });
    }
  };
})

.filter('highlight', function($sce) {
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
