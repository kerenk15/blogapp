(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('postsController', function( $scope , postsData , $filter , $location ,  $routeParams){
		postsData
			.success(function(data , status) {
   				var filteredObj = $location.search();
   				// sideBar filter
				$scope.postsData = ($filter('sidebarfilter')(data.posts , filteredObj , $filter));
				 //move to the next page and the next posts
				$scope.postsInPage($scope.postsData);
				 //show only 3 posts in a page
				$scope.postsData = ($filter('slice')($scope.postsData , $scope.start , $scope.end));
  			})
			.error(function(data , status){
				console.log(status , data);
			});

		$scope.postsInPage = function(postsData){
			var page = $routeParams; // check on witch page are we

			if (parseInt(page.pageNum) > 1){ //if we are not on the first page
				$scope.start = ((parseInt(page.pageNum) - 1) * 3); //move till the next 3 posts
				$scope.pageNum = parseInt(page.pageNum); //update the page bumber
				$scope.nextPosts = true;
			}else{ // if we are on the first page
				$scope.start = 0;
				$scope.pageNum = 1;
				$scope.nextPosts = false; //hide the newer button
			}
			$scope.end = $scope.start + 3;

			if ((postsData.length / 3 ) <= $scope.pageNum){
				$scope.previousPosts = false;// hide the older button if there are no more posts to show
			}else{
				$scope.previousPosts = true;
			}
		};


	});

}());
