(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.filter('cleanTitle', function () {
	    return function (value) {
	        value = (!value) ? '' : value.replace(/,| /g, '-');
	        value = (!value) ? '' : value.replace(/---/g, '-');

	        return value;
	    };
	});

	app.filter('slice', function() {
  		return function(arr, start, end) {
    		return (arr || []).slice(start, end);
  		};
	});

	app.filter('sidebarfilter' ,function(){
		return function (data, obj , $filter ) {
			var filteredArr , tags , i , searchValue;
			console.log(obj);

			if (obj.search){
				searchValue = obj.search;
			}

			if (obj.author){
				for (i = 0; i < data.length; i++) {
					data[i].author = $filter('cleanTitle')(data[i].author);
					data[i].author = $filter('lowercase')(data[i].author);
				}
				searchValue = obj.author;
			}

			if (obj.category){
				for (i = 0; i < data.length; i++) {
					tags = data[i].tags;
					for (var k = 0; k < tags.length; k++) { // filter inside tags array inside data
						tags[k] = $filter('cleanTitle')(tags[k]);
						tags[k] = $filter('lowercase')(tags[k]);
					}
					console.log(data[i].tags);
				}
				searchValue = obj.category;
				console.log(data, searchValue);
			}

			if (obj.month){
				for (i = 0; i < data.length; i++) {
					data[i].date = $filter('date')(data[i].date , 'MMMM');
					data[i].date = $filter('lowercase')(data[i].date);
					console.log(data[i].date);
				}
				searchValue = obj.month;
			}

			filteredArr = $filter('filter')(data, searchValue);
			console.log(filteredArr);
			return filteredArr;

  		};
	});

}());
