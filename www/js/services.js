angular.module('npa.services', [])

.factory('Welcome', function($http, $q) {
    return {
        getHomeList: function (){
            return $http.get('http://10.28.103.98:8686/TestRestWs/rest/welcomeJSON/getHomeListByJSON/')
                .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
                );
         },
         getHome: function (id){
            return $http.get('http://10.28.103.98:8686/TestRestWs/rest/welcomeJSON/getHomeByJSON/'+id)
                .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
                );
         },
         getProvince: function (){
            return $http.get('http://10.28.103.98:8686/TestRestWs/rest/masterJSON/getProvinceListByJSON/')
                .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
                );
        },
        getDistrict: function (provinceId){
            return $http.get('http://10.28.103.98:8686/TestRestWs/rest/masterJSON/getDistrictByJSON/'+provinceId)
                .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
                );
        },
        getSearchHomeList: function (json){
            console.log(json);
            return $http.get('http://10.28.103.98:8686/TestRestWs/rest/homeJSON/getHomeListByJSON/' + json)
                .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        return $q.reject(errResponse);
                    }
                );
        }
    };
});