(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.filter('nospace', function () {
	    return function (value) {
	        return (!value) ? '' : value.replace(/ /g, '');
	    };
	});


}());
