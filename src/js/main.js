;(function(){ //IIFE for angular
  angular.module('fitTracker', ['ngRoute'], function($routeProvider){
      $routeProvider
        .when('/',{
          redirectTo: 'login'
        })
        .when('/login', {
          templateUrl: 'partials/login.html'
        })
        .when('/activities',{
          templateUrl: 'partials/activities.html'
        })
        .when('/stats', {
          templateUrl: 'partials/stats.html'
        })
        // .else()
    })

    .controller('MainController', function($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
  })





})(); //end IIFE
