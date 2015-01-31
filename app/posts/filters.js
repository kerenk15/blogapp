(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.filter('noSpace', function () {
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


}());
