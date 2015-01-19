(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('postController', function( $scope , postsData){
		postsData
			.success(function(data , status) {
   				$scope.postsData = data.posts;
  			})
			.error(function(data , status){
				console.log(status , data);
			});

		$scope.getDate = function(post){
			console.log(post);
			/*post = 1417384800000;*/
			var dateN = new Date(post);
			dateN = dateN.toDateString(post);
			console.log(dateN);
   			return dateN;
		};


	});

}());
