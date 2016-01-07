angular.module("npa.controllers", [])

// ส่วนจัดการ controller ต่างๆ 
.controller('welcomeCtrl', function($scope, Welcome) {
    $scope.HomeList = [];
    Welcome.getHomeList()
        .then(
            function(data){
                $scope.HomeList = data;
            },
            function(errResponse){
                console.error('Error while creating user')
            }
        )
})
.controller('searchCtrl', function($scope, $stateParams, Welcome) {
    
    var type = $stateParams.typeSearch;
    $scope.typeSearch = $stateParams.typeSearch;
    
    if(type == '1')
        $scope.type = 'Condo';
    else if(type == '2')
         $scope.type = 'Home';
     
     $scope.Province = [];
     $scope.District = [];
     
     $scope.search = [];
     
     $scope.search.name = '';
     $scope.search.selectProvince = '';
     $scope.search.seleteDistrict = '';
     $scope.search.maxPrice = 0;
     $scope.search.minPrice = 0;
     
     Welcome.getProvince()
        .then(
            function(data){
                $scope.Province = data;
            },
            function(errResponse){
                console.error('Error while creating user')
            }
        )

        $scope.getDistrict = function(provinceId){
            console.log(provinceId);
            Welcome.getDistrict(provinceId)
            .then(
                function(data){
                    $scope.District = data;
                },
                function(errResponse){
                    console.error('Error while creating user')
                }
            )
        }
        
        $scope.searchList = function(search){
            
            if(search.name == ''){
                search.name = '?';
            }
            
            if(search.selectProvince == ''){
                search.selectProvince = '?';
            }
            
            if(search.seleteDistrict == ''){
                search.seleteDistrict = '?';
            }
            
            Welcome.getSearchHomeList(search)
                .then(
                    function(data){
                        $scope.District = data;
                    },
                    function(errResponse){
                        console.error('Error while creating user')
                    }
                )
        }
})

.controller('viewCtrl', function($scope, $stateParams, Welcome, $ionicLoading) {
    $scope.Home = [];
    var id = $stateParams.homeId;
    
    $ionicLoading.show({
      template: 'Loading...'
    });
    
    
    Welcome.getHome(id)
        .then(
            function(data){
                $scope.Home = data;
                $ionicLoading.hide();
            },
            function(errResponse){
                console.error('Error while creating user')
            }
        )
        
})

.controller('viewListCtrl', function($scope, $stateParams, Welcome, $ionicLoading) {
    $scope.numberOfItemsToDisplay = 5; //โหลดทีเดียวแต่แบ่งโชว์ --1

    var json = JSON.stringify({name : $stateParams.name, province : $stateParams.province, district : $stateParams.district, maxPrice : $stateParams.maxprice, minPrice : $stateParams.minprice, size : $scope.numberOfItemsToDisplay});
    var type = $stateParams.typeSearch;
    $scope.Home = [];
    
    $scope.linkBank = $stateParams.typeSearch;
    
    if(type == '1')
        $scope.type = 'Condo';
    else if(type == '2')
         $scope.type = 'Home';
    
    $ionicLoading.show({
      template: 'Loading...'
    });
    
    Welcome.getSearchHomeList(json)
        .then(
            function(data){
                $scope.Home = data;
                $ionicLoading.hide();
            },
            function(errResponse){
                console.error('Error while creating user')
            }
        )

    $scope.addMoreItem = function() { 
        if ($scope.Home.length > $scope.numberOfItemsToDisplay)
            $scope.numberOfItemsToDisplay += 5; 
            var json = JSON.stringify({name : $stateParams.name, province : $stateParams.province, district : $stateParams.district, maxPrice : $stateParams.maxprice, minPrice : $stateParams.minprice, size : $scope.numberOfItemsToDisplay});
            
             Welcome.getSearchHomeList(json)
                .then(
                    function(data){
                        $scope.Home = data;
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },
                    function(errResponse){
                        console.error('Error while creating user')
                    }
                )
        }
        
})

.controller('viewDetailCtrl', function($scope, $stateParams, Welcome, $ionicLoading) {
    $scope.Home = [];
    var id = $stateParams.homeId;
    
    $ionicLoading.show({
      template: 'Loading...'
    });
    
    
    Welcome.getDetail(id)
        .then(
            function(data){
                $scope.Home = data;
                $ionicLoading.hide();
            },
            function(errResponse){
                console.error('Error while creating user')
            }
        )
        
})

.controller("mapCtrl",function($scope, $ionicLoading, $compile, Welcome) {
        
    var map;
    var infowindow;
    var lat;
    var lng;
    $scope.address = [];
    $scope.center = [];
    $scope.markers = [];
    var centerId = 1;
    var markerId = 1;
    
    $scope.initialize = function() {
        $scope.getCurrentMap();
    }
    
    $scope.getCurrentMap = function (){
        navigator.geolocation.getCurrentPosition(function(pos) {
            
            // -------------------- Get Center  --------------------
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            // ----------------------------------------------
            
            // -------------------- Set Center  --------------------
            var mapOptions = {
                center: new google.maps.LatLng(lat, lng),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            infowindow = new google.maps.InfoWindow(); 


            var myLatlng = new google.maps.LatLng(lat, lng);
            var center = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 5
                }
            }); 
            center.id = centerId;
            
            $scope.center.push(center);
            // ----------------------------------------------

            google.maps.event.addListener(center, 'click', function() {
                infowindow.setContent('ME!');
                infowindow.open(map,this);
            });
            
            google.maps.event.addListener(map, 'dragend', function() { 
                var center = map.getCenter();
                lat = center.lat();
                lng = center.lng();
                
                // Remove Center
                for(var i=0;i<$scope.center.length;i++){
                    $scope.center[i].setMap(null);
                } 
               
                var myLatlng = new google.maps.LatLng(lat, lng);
                var center = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        scale: 5
                    }
                }); 
                
                center.id = centerId;
                centerId++;
                
                $scope.center.push(center);
//                
                // Remove Marker
                for(var i=0;i<$scope.markers.length;i++){
                    $scope.markers[i].setMap(null);
//                    $scope.markers.splice(i, 1);
                }
                
                
                $scope.getService(lat, lng);
            });
            
            // Call Service
            $scope.getService(lat, lng);
        }, function(error) {
             alert('Unable to get location: ' + error.message);
        });
    }
    
    $scope.getService = function (lat, lng){
        Welcome.getMap(lat, lng)
                 .then(
                    function(data){
                        $scope.address = data;

                        for(var i=0;i<$scope.address.length;i++){

                            var myLatlng = new google.maps.LatLng($scope.address[i].lat, $scope.address[i].lng);

                            var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                info : $scope.address[i].address,
                                animation: google.maps.Animation.BOUNCE
                            }); 

                            google.maps.event.addListener(marker, 'click', function() {
                                infowindow.setContent(this.info);
                                infowindow.open(map,this);
                            });
                            
                            //Set unique id
                            marker.id = markerId;
                            markerId++;
                            
                            //Add marker to the array.
                            $scope.markers.push(marker);
                        }

                        $ionicLoading.hide();
                    },
                    function(errResponse){
                        console.error('Error while creating user')
                    }
            )
    }
});