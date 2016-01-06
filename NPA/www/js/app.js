//var app = angular.module("myIonicApp3", ['ionic']) // สร้าง module และเรียกใช้งาน ionic
angular.module('myIonicApp3', ['ionic', 'npa.controllers', 'npa.services'])
// ตั้งค่า provider สำหรับใช้งาน ngRoute service ใน ionic จะใช้ชื่อใหม่
// ต่างจาก angurlarjs แต่รูปแบบจะคล้ายๆ กัน

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
    .state('intro', {  
        url: '/',  
        templateUrl: 'tpl/welcome.html',  
        controller: 'welcomeCtrl'  
    })
    
    .state('search', {  
        url: '/search/:typeSearch',
        templateUrl: 'tpl/search.html',  
        controller: 'searchCtrl'  
    })
    
    .state('view', {  
        url: '/view/:homeId',
        templateUrl: 'tpl/view.html',  
        controller: 'viewCtrl'  
    })
    
    .state('viewList', {  
        url: '/viewList/:name/:province/:district/:maxprice/:minprice/:typeSearch',
        templateUrl: 'tpl/viewList.html',  
        controller: 'viewListCtrl'  
    })
    
    .state('viewDetail', {  
        url: '/viewDetail/:homeId',
        templateUrl: 'tpl/viewDetail.html',  
        controller: 'viewDetailCtrl'  
    })
    
    .state('map', { 
        url: '/map',
        templateUrl: 'tpl/map.html',
        controller: 'mapCtrl',

    })
    
    $urlRouterProvider.otherwise("/"); // กรณีอื่นๆ ให้ url อ้างอิง เท่ากับ  / หรือหน้าแรก
    
    
    
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
