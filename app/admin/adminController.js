(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('adminController', function( $scope , postsData){
		postsData.get().then(function(data){
   				$scope.postsData = data.posts;
  			});

	});

}());
