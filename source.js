angular.module("hmautocomplete", [])
.directive('hmAutocomplete',function($timeout){
	return{
		scope :{
			selectedIndex:'=',
      hmSuggestions:'=',
      hmDropdownid:'@',
      hmSelect:'&',
      hmTextboxid:'@'
    },

		link:function(scope,element){

      scope.selectedIndex = -1;

      var elem = angular.element(document.getElementById(scope.hmTextboxid));
      var list = angular.element(document.getElementById(scope.hmDropdownid));

      list.css('display','none');

      elem.bind('focus', function(){
        scope.selectedIndex=0;
        scope.$apply();
        list.css('display','block');
      });

      elem.bind('blur',function(){
        $timeout(
          function(){
            list.css('display','none');
          },100
        )
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
        link: function (scope,element,attr) {

            element.on('mouseenter', function() {
                angular.element(document.getElementsByClassName(attr.hoverClass)).removeClass(attr.hoverClass);
                element.addClass(attr.hoverClass);
            });

            element.on('mouseleave', function() {
                element.removeClass(attr.hoverClass);
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
        scope.hmSelectDown();
        list.css('display','none');
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
});

