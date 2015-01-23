(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('postController', function( $scope , postsData , $location){
		postsData
			.success(function(data , status) {
   				$scope.postsData = data.posts;
  			})
			.error(function(data , status){
				console.log(status , data);
			});

	$scope.openPost = function(src) {

		var url = src.replace(/[\s]/g, '');

		// src.slice(11, -5);
		// url = url.split (' ');

		console.log(url);
		/*var path = '#/post/';
		$location.search();
		$location.path('src').replace();*/
	};


	});
}());
