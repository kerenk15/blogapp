(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('pageController', function( $scope , $routeParams , postsData){
		var page = $routeParams.page;

		$scope.page = function(start , end){
		console.log(start , end);
		start = start + 3;
		end += 3;
		var page = $scope.end/$scope.start;
		return(start , end , page);
	};


	});
}());
