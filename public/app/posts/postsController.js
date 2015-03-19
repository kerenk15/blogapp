(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('postsController', function( $scope , postsData ,activeNav , $filter , $location ,
	 $routeParams , $rootScope){

		$rootScope.hideSideBar = false;
		$rootScope.activetab = 'posts';

		postsData.get().then(function(data) {
				var filteredObj = $location.search();
				//order all posts by data
				$scope.postsData = $filter('orderBy')(data.posts, '-date');
   				// sideBar filter
				$scope.postsData = ($filter('sidebarfilter')($scope.postsData , filteredObj));
				//save posts length
				$scope.postsLength = $scope.postsData.length;
				 //move to the next page and the next posts
				$scope.postsInPage($scope.postsData);
				 //show only 3 posts in a page
				$scope.postsData = ($filter('slice')($scope.postsData , $scope.start , $scope.end));


  			});

		var tab = $location.path().slice(1);
		activeNav.set(tab);

		$scope.postsInPage = function(postsData){
			var  page = parseInt($routeParams.pageNum); // check on witch page are we

			//dealing with page 1
			if(page === 1){
				$location.path('/posts');
			}

			if (page > 1){ //if we are not on the first page
				$scope.start = ((page - 1) * 3); //move till the next 3 posts
				$scope.pageNum = page; //update the page bumber
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
