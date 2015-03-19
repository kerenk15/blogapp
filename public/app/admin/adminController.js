(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('adminController', function( $scope , postsData, activeNav , $filter , $location, $rootScope){
		postsData.get().then(function(data) {
   				var filteredObj = $location.search();
   				$rootScope.activetab = 'admin';
   				$rootScope.hideSideBar = false;

   				// sideBar filter
				$scope.postsData = ($filter('sidebarfilter')(data.posts , filteredObj));
				console.log($scope.postsData);

				$scope.editPost = function(title){
					$location.path('/admin/edit/post/' + ($filter('cleanTitle')(title)));
				};

  			});

		var tab = $location.path().slice(1);
		activeNav.set(tab);

		$scope.orderByField = 'date';
		$scope.reverseSort = true;

		$scope.orderBy = function(value){
			$scope.orderByField = value;
			$scope.reverseSort = !$scope.reverseSort;
		};

	});

}());
