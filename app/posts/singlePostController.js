(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('singlePostController', function( $scope , $routeParams , postsData){
		var postTitle = $routeParams.title;
		var postSrc = $scope.postsData;
		console.log(postTitle , postSrc);

	});
}());
