(function () {
	'use strict';

	var app = angular.module('blogApp');

	app.controller('newPostController', function( $scope , postsData, $filter , $sanitize ,
		$location , $rootScope){

		$rootScope.hideSideBar = true;
		$rootScope.activetab = 'admin';

		postsData.get().then(function(data) {
			$scope.postsData = data.posts;
		});

		$scope.submit = function(newPost) {
	      	$scope.submitted = true;
	      	$scope.invalidTitle = false;
	      	var title = newPost.title;
	      	$scope.editPost = false; //for the delete button

	      	console.log(newPost);

	      	//if not all the required fields are entered
        	if (newPost === undefined || newPost.title === undefined || newPost.author === undefined ||
        		newPost.description === undefined || newPost.src === undefined){
        		return;
        	}else{
        		//chech for uniqe title
        		for (var i = 0; i < $scope.postsData.length; i++) {
					console.log($scope.postsData[i].title);
					if (($scope.postsData[i].title) === newPost.title){
						$scope.invalidTitle = true;
						return;
        			}
        		}

        		var j = $scope.postsData.length,
    			curDateTime = new Date().getTime().toString(),
    			tagsList;

				//new array of tags
				if (newPost.tags !== undefined){
        			tagsList = newPost.tags.split(',');
        		}

    			//new obj in the posts array
    			var postObj =
		        $scope.postsData[j] = {
		            title : newPost.title ,
					author : newPost.author ,
					description : newPost.description ,
					mdSource : newPost.src ,
					date : curDateTime ,
					tags : tagsList

		        };

				postsData.save(title, postObj)
	            .then(function (post) {
	                console.log(post);
	            });

	            $location.path('/admin/'); //redirect to the admin panel

        	}
    	};

		//markdown options
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
