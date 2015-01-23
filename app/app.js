(function () {
	'use strict';

	var app = angular.module('blogApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider , $locationProvider) {
        $routeProvider

            .when('/', {
                redirectTo: '/posts'
            })

            // route for the home page
            .when( '/posts',{
                templateUrl : 'app/posts/allPosts.html',
                controller  : 'postController'
            })

            // route for the admin page
            /*.when('/admin', {
                templateUrl : 'app/admin/admin.html',
                controller  : ''
            })*/

            .otherwise({
                redirectTo: '/posts'
            });

        /*app.get('*', routes.index);*/
        $locationProvider.html5Mode(true).hashPrefix('!');

    });

}());

