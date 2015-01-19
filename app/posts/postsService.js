(function () {
    'use strict';

    var app = angular.module('blogApp');

    app.factory('postsData', function($http) {
        return  $http.get('data/posts.json');
    });

}());

