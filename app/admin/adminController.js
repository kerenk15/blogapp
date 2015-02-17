(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('adminController', function( $scope , postsData , $filter , $location ,  $routeParams){
		postsData.get().then(function(data) {
   				var filteredObj = $location.search();

				$scope.activeTab = postsData.activeTab();
				console.log($scope.activeTab);

   				// sideBar filter
				$scope.postsData = ($filter('sidebarfilter')(data.posts , filteredObj));
				console.log($scope.postsData);

  			});

	});

}());
