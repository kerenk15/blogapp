(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.filter('nospace', function () {
	    return function (value) {
	        value = (!value) ? '' : value.replace(/,/g, '-');
	        return (!value) ? '' : value.replace(/ /g, '');
	    };
	});

	app.filter('slice', function() {
  		return function(arr, start, end) {
    		return (arr || []).slice(start, end);
  		};
	});


}());
