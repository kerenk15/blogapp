(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('sideBarController', function( $scope , postsData, $filter){
		postsData
			.success(function(data , status) {
   				$scope.postsData = data.posts;
   				$scope.navCount = $scope.count($scope.postsData);

  			})
			.error(function(data , status){
				console.log(status , data);
			});



		$scope.count = function(postsData){
			var author,
				year,
				month,
				tag,
				tags = [],
         		objAuthor = {},
         		objDate = {},
         		objTags = {},
         		navCount = {};


		  	for (var i = 0; i < postsData.length; i++){
		    	author = postsData[i].author;
		    	year = $filter('date')(postsData[i].date , 'yyyy');
		    	month = $filter('date')(postsData[i].date , 'MMMM');
		    	tags = postsData[i].tags;

		       	//author counter
		       	if (objAuthor[author]) {
					objAuthor[author] = objAuthor[author] + 1;
				}
				else {
					objAuthor[author] = 1;
				}

				//date counter
				if (objDate[year]) {
					if (objDate[year][month]) {
						objDate[year][month] = objDate[year][month]+1;
					}
					else {
						objDate[year][month] = 1;
					}
				}
				else{
					objDate[year] = {};
					objDate[year][month] = 1;
				}

				//tags counter
				for (var j = 0; j < tags.length; j++) {
					tag = tags[j];

					if (objTags[tag]) {
						objTags[tag] = objTags[tag] + 1;
					}
					else {
						objTags[tag] = 1;
					}
				}
		    }

		    navCount = {
		    	Author:objAuthor,
		    	Year:objDate,
		    	Tags: objTags
		    };

		    return (navCount) ;
		};


	});
}());
