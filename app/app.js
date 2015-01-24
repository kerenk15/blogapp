(function () {
	'use strict';

	var app = angular.module('blogApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            .when('/', {
                redirectTo: '/posts'
            })

            // route for the home page
            .when( '/posts',{
                templateUrl : 'app/posts/allPosts.html',
                controller  : 'postController'
            })

            // route for different page
            .when( '/posts/:page',{
                templateUrl : 'app/posts/allPosts.html',
                controller  : 'pageController'
            })

            // route for the single post page
            .when( '/post/:title',{
                templateUrl : 'app/posts/singlePost.html',
                controller  : 'singlePostController'
            })

            // route for the admin page
            .when('/admin', {
                templateUrl : 'app/admin/admin.html',
                controller  : ''
            })

            .otherwise({
                redirectTo: '/posts'
            });

    });

}());

