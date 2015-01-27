(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('postsController', function( $scope , postsData){
		postsData
			.success(function(data , status) {
   				$scope.postsData = data.posts;
  			})
			.error(function(data , status){
				console.log(status , data);
			});

	$scope.start = 0;
	$scope.end = $scope.start + 3;



	});

}());
