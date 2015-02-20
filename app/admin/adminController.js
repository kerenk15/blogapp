(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('adminController', function( $scope , postsData, activeNav , $filter , $location ,  $routeParams){
		postsData.get().then(function(data) {
   				var filteredObj = $location.search();

   				// sideBar filter
				$scope.postsData = ($filter('sidebarfilter')(data.posts , filteredObj));
				console.log($scope.postsData);

  			});

		var tab = $location.path().slice(1);
		activeNav.set(tab);

	});

}());
