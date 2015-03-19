(function () {
    'use strict';

    var app = angular.module('blogApp');


    app.factory('postsData', ['$http' , '$q', '$location', function($http , $q , $location) {
        var dataCache = {},
        	//declare the defer
        	defer = $q.defer(),
        	//declare the promise. Where ever we use this promis.then , it will run after the resolve
        	promise = defer.promise;

        	$http.get('/posts')
        		.success(function (data , status) {
					dataCache.posts = data.posts;
					defer.resolve(dataCache); //when succeded to get the data, send the promise the dataCach obj
  			})
			.error(function(data , status){
				console.log(status , data);
			});

        return  {
            save: function (title, postObj , index) {
                    var defer = $q.defer();

                    $http.post('/posts', {
                        title: title,
                        index: index,
                        data: postObj
                    })
                        .success(function (data, status) {
                            defer.resolve(data);
                        });

                    return defer.promise;
            },
        	get: function(){
        		  return promise;
        	},
            remove: function (index){
                var defer = $q.defer();

                $http.post('/admin', {
                    index: index
                })
                    .success(function (data, status) {
                        defer.resolve(data);
                    });

                return defer.promise;
            }

        };

    }]);

    app.factory('activeNav', ['$location', function($location) {
        var activeTab = {};

        return  {
        	get: function(){
        		return activeTab;
        	},
        	set: function(tab){
        		activeTab.active = tab;
        		return activeTab;
        	}
        };

    }]);

}());

