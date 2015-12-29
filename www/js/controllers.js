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
        
});