angular-autocomplete
====================
Angularjs Customizable Autocomplete - version 0.0.1 - no jquery Dependancy

##Dependencies
* Angularjs
* autocomplete.js - javascript file
* css - for designing

##Configuration

* Include autocomplete.js and autocomplete.css file
* Inject 'hmautocomplete' dependency

##Usage

```
      <hm-autocomplete
	    selected-index="selectedIndex"
	    hm-textboxid="autotext2"
            hm-dropdownid="dropdown2"
            hm-suggestions="items"
            hm-select="onselect(items[selectedIndex])"
        >
        <input type="text" id="autotext2" class="form-control" placeholder="select country" />
        
			<ul id="dropdown2" class="ngcomplete-dropdown">
				<li ng-repeat="item in items | limitTo:10"
				class="ngcompleterow"
        hover-class='ngcompleterowactive'
        ng-mouseover='selectedIndex=$index'
        ng-class="{'ngcompleterowactive':selectedIndex==$index}"				    
        hm-select-down="onselect(item)">
          <label ng-bind-html="item.Name | highlight:strSearch"></label>
				</li>
			</ul>
		</hm-autocomplete>
```
Important parameters:
* hm-textboxid - pass id of textbox to directive
* hm-select - pass function name to be executed on select
* hm-select-down (redundancy - will be removed in next version) - pass function name in list 

## Demo

[Plnkr](http://plnkr.co/edit/tcmprqr86g4EzKke116J?p=preview)

##Contribute

Angular-autocomplete is open source project that accept Pull Requests and other contributions

##License

Angular-autocomplete is licensed under the MIT license.
