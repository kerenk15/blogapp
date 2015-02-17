(function () {
    'use strict';

    var app = angular.module('blogApp');


    app.factory('postsData', ['$http' , '$q', '$location', function($http , $q , $location) {
        var dataCache = {},
        	//declare the defer
        	defer = $q.defer(),
        	//declare the promise. Where ever we use this promis.then , it will run after the resolve
        	promise = defer.promise;

        	$http.get('data/posts.json')
        		.success(function (data , status) {
					dataCache.posts = data.posts;
					defer.resolve(dataCache); //when succeded to get the data, send the promise the dataCach obj
  			})
			.error(function(data , status){
				console.log(status , data);
			});

        return  {
        	get: function(){
        		return promise;
        	},
        	activeTab: function(){
        		var tab = $location.path().slice(1);
        		return tab;
        	}
        };

    }]);

}());

