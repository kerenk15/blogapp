(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('postsController', function( $scope , postsData , $filter , $location){
		postsData
			.success(function(data , status) {
   				var filteredObj = $location.search();
				$scope.postsData = ($filter('sidebarfilter')(data.posts , filteredObj , $filter));

  			})
			.error(function(data , status){
				console.log(status , data);
			});

	$scope.start = 0;
	$scope.end = $scope.start + 3;




	});

}());
