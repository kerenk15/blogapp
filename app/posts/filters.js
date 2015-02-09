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
			var arr = [];

			if (obj) {

				if (obj.search){
				return ($filter('filter')(data, obj.search));
				}

				if (obj.author){
					for (var i = 0; i < data.length; i++) {
						if ($filter('cleanTitle')(data[i].author).toLowerCase() === obj.author){
							arr.push(data[i]);
						}
					}
					return arr;
				}

				if (obj.category){
					console.log(obj.category , ($filter('filter')(data, obj.category)));
					return ($filter('filter')(data, obj.category));
				}

				if (obj.month){
					for (var j = 0; j < data.length; j++) {
						if ($filter('date')(data[j].date , 'MMMM').toLowerCase() === obj.month){
							arr.push(data[j]);
						}
					}
					return arr;
				}
			}

			return data;

  		};
	});

}());
