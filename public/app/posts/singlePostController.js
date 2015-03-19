(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('singlePostController', function( $scope , $routeParams, $filter, postsData , $sanitize , $http){
		var postTitle = $routeParams.title;

		postsData.get().then(function(data){
			// Get post by title
			data.posts.forEach(function (post) {
				if ($filter('cleanTitle')(post.title) === postTitle) {
					$scope.postData = post;
					console.log($scope.postData);

					$http.get(post.htmlPath)
					.success(function (data) {
					$scope.postHtml = $sanitize(data);
					});
				}
			});

  		});

	});
}());
