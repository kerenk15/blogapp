(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('sideBarController', function( $scope , postsData , activeNav , $filter ,
	 $location , $routeParams){

		postsData.get().then(function(data) {
   				$scope.postsData = data.posts;
   				$scope.navCount = $scope.count($scope.postsData);

  			});

		$scope.activeTab = activeNav.get();

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
		    	author = postsData[i].author.toLowerCase();
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
					tag = tags[j].toLowerCase();

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

    	$scope.submit = function() {
	        if ($scope.text) {
	        	$location.search('');
	        	this.text = $filter('cleanTitle')(this.text);
				this.text = $filter('lowercase')(this.text);
	            $location.search('search', this.text);
	       		$scope.text = '';
	        }
    	};

   		$scope.isActive = function(route) {
   			//the route is the key hst we filtered by the sideBar
   			var lowercase =  $filter('lowercase')(route);
   			var cleanTitle;

   			if (route === undefined ){ //meaning we want to see all the posts
   				cleanTitle = undefined;
   			}else{
   				cleanTitle = $filter('cleanTitle')(lowercase);
   			}

        	return cleanTitle === ($location.search().author || $location.search().category ||
        	 $location.search().month || undefined);
        	 //in each sideBar filter we check if the route equals the URL
   		};

	});
}());
