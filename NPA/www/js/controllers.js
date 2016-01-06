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
        $scope.address = [];
        
      $scope.initialize = function() {
          
        var mapOptions = {
            center: {lat: 13.744143, lng: 100.551847},
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        infowindow = new google.maps.InfoWindow(); 
        
        
        var myLatlng = new google.maps.LatLng(13.744143, 100.551847);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        }); 

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('ME!');
            infowindow.open(map,this);
        });
        
        var lat = 13.744143;
        var lng = 100.551847;

        Welcome.getMap(lat, lng)
            .then(
                function(data){
                    $scope.address = data;
                    
                    for(var i=0;i<$scope.address.length;i++){
                        
                        var myLatlng = new google.maps.LatLng($scope.address[i].lat, $scope.address[i].lng);

                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            info : $scope.address[i].address
                        }); 
                                                
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent(this.info);
                            infowindow.open(map,this);
                        });

//                        $scope.map = map;
                    }
                    
                    $ionicLoading.hide();
                },
                function(errResponse){
                    console.error('Error while creating user')
                }
            )
//        var myLatlng = new google.maps.LatLng(13.744143,100.551847);
//        
//        var mapOptions = {
//          center: myLatlng,
//          zoom: 16,
//          mapTypeId: google.maps.MapTypeId.ROADMAP
//        };
//        map = new google.maps.Map(document.getElementById("map"), mapOptions);
//        
//        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
//        var compiled = $compile(contentString)($scope);
//        
//        var infowindow = new google.maps.InfoWindow({
//          content: compiled[0]
//        });
//
////        var infowindow = new google.maps.InfoWindow();
//        var marker = new google.maps.Marker({
//            position: myLatlng,
//            map: map,
//        });

       
//        $scope.test();
      }
      
//      $scope.test = function (){
//        console.log('1111111111');
//          
//        var myLatlng = new google.maps.LatLng(13.744143,101.551847);
//          
//        var marker = new google.maps.Marker({
//            position: myLatlng,
//            map: map,
//        });
//
//        google.maps.event.addListener(marker, 'click', function() {
//            content: 'Getting current location...',
//            infowindow.open(map,marker);
//        });
//      }

});