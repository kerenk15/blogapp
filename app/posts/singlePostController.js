(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('singlePostController', function( $scope , $routeParams, $filter, postsData){
		var postTitle = $routeParams.title;

		postsData
			.success(function(data , status) {

				// Get post by title
				data.posts.forEach(function (post) {
					if ($filter('noSpace')(post.title) === postTitle) {
						$scope.postData = post;
						console.log($scope.postData);
					}
				});
  			})
			.error(function(data , status){
				console.log(status , data);
			});


	});
}());
