(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('pageController', ['postsData' , function( $scope , $routeParams , postsData){
		/*$scope.page = $routeParams.page;*/
		/*$scope.model = {
			page: {
					start: 0,
					end: 3
				  }
		};*/

		$scope.page = function(start , end){
			console.log(start , end);
			start = start + 3;
			end += 3;
			var page = $scope.end/3;
			return(start , end , page);
		};


	}]);
}());
