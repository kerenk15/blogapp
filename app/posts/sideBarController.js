(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('sideBarController', function( $scope , postsData){
		postsData
			.success(function(data , status) {
   				$scope.postsData = data.posts;
  			})
			.error(function(data , status){
				console.log(status , data);
			});


$scope.arr=[];

		$scope.count = function(postAttr , num){
			console.log($scope.arr);
			$scope.num = 0;
			$.each($scope.arr, function( index, value ) {
				if (value === postAttr){
					console.log(postAttr , num , value );
					num++;
				}
					return(num);

			});

			$scope.arr.push(postAttr);
			return(num = 1);
		};

	});
}());
