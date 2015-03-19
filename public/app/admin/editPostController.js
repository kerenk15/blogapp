(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('editPostController', function( $scope , $routeParams, $filter, postsData ,
	 $sanitize , $http , $location , $rootScope){

		var postTitle = $routeParams.title;
		$scope.editPost = true;
		$rootScope.hideSideBar = true;
		$rootScope.activetab = 'admin';

		postsData.get().then(function(data){
			$scope.postsData = data.posts;

			// Get post by title
			data.posts.forEach(function (post) {
				if ($filter('cleanTitle')(post.title) === postTitle) {
					//single post
					$scope.postData = post;

					//index of post
					$scope.index = $scope.postsData.indexOf($scope.postData);

					$http.get(post.htmlPath)
						.success(function (data) {
							$scope.postData.src = $sanitize(data);
					});
				}
			});

	    	$scope.deletePost = function(){
	    		$scope.postsData.splice($scope.index , 1 );
	    		$location.path('/admin/');

	    		postsData.remove ($scope.index)
	            .then(function (post) {
	                console.log(post);
	            });

	            return $scope.postsData;
	    	};

  		});

  		$scope.submit = function(newPost) {
	      	$scope.submitted = true;
	      	$scope.invalidTitle = false;
	      	var title = newPost.title;

	      	//if not all the required fields are entered
        	if (newPost === undefined || title === undefined || newPost.author === undefined ||
        		newPost.description === undefined || newPost.src === undefined){
        		return;
        	}else{
        		//check for uniqe title
        		for (var i = 0; i < $scope.postsData.length; i++) {
        			//ensure that we're not dealing with the same post
					if ((($scope.postsData[i].title) === title) && (i !== $scope.index)){
						$scope.invalidTitle = true;
						return;
        			}
        		}

				var tagsList = newPost.tags;

				//new array of tags
				if (tagsList !== undefined){
					if (!Array.isArray(tagsList)){
						tagsList = newPost.tags.split(',');
					}
					console.log(tagsList);
        		}

    			//update obj in the posts array
				console.log( $scope.postsData[$scope.index]);
				console.log(tagsList);

		        var postObj =
		        $scope.postsData[$scope.index] = {
		            title : newPost.title ,
					author : newPost.author ,
					description : newPost.description ,
					mdSource : newPost.src ,
					date :   $scope.postsData[$scope.index].date,
					tags : tagsList,
					mdPath :  $scope.postsData[$scope.index].mdPath
		        };

				postsData.save(title, postObj , $scope.index)
	            .then(function (post) {
	                console.log(post);
	            });

	            $location.path('/admin/'); //redirect to the admin panel

		    }
    	};

		marked.setOptions({
			// GitHub Flavored Markdown
			gfm: true,
		  	// GFM tables
		 	tables: true,
		  	// GFM line breaks
		 	breaks: true,
		  	// Better lists handling
		 	smartLists: true,
		 	// Better punctuation handling
			smartypants: true,
		 	// Code blocks language prefix (reset default)
			langPrefix: '',
			// Prefix for headings ID's
			headerPrefix: 'hid-',
		 	highlight: false
		});

		$scope.changeMarkdown = function(markdownText){
			if(markdownText === undefined){
				markdownText = '';
			}
			var html = marked(markdownText);
			return html;
		};

	});
}());

