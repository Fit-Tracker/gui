;(function(){ //IIFE for angular
  angular.module('fitTracker', ['ngRoute'], function($routeProvider){
      $routeProvider
        .when('/',{
          redirectTo: 'user'
        })
        .when('/user', {
          templateUrl: 'partials/user.html'
        })
        .when('/user-create', {
          templateUrl: 'partials/user-create.html'
        })
        .when('/activities', {
          templateUrl: 'partials/activities.html'
        })
        .when('/stats/:id',{
          templateUrl: 'partials/stats.html',
          controller: function($location, $routeParams, $http, $rootScope){
            var id = $routeParams.id;
            console.log("stats page controller: " + id);
            $location.path('/stats');
            $http.get("/src/api/activities/"+ id +".json")
              .then(function(response){
                // console.log("got them stats")
                // console.log(response.data);
                $rootScope.stats = response.data;
              });
          },
          controllerAs: 'statsPage'
        })

        .when('/stats', {
          templateUrl: 'partials/stats.html'
        })
        .otherwise({
          redirectTo: '/404.html',
          templateUrl: 'partials/404.html'
        })
    })

    .controller('MainController', function($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    })

    .controller("userCreateController", function($http){
      this.newUser = {};
      this.createUser = function(newUser){
        console.log(this.newUser);
        $http.get("someurl", this.newUser)
        .then(function(response){console.log("success")},
        function(response){console.log("FAILURE!!!!")});
        this.newUser = {};
      };
    })

    .controller("userLoginController", function(){
      this.user = {};
      this.login = function(user){
        console.log(this.user);
        this.user = {};
      };
    })

    .controller("newActivityController", function(){
      this.activity = {};
      this.createActivity = function(activity){
        console.log(this.activity);
        this.activity = {};
      };

    })

    .controller("newStatController", function(){
      this.stat = {};
      this.createStat = function(stat){
        console.log(this.stat);
        this.stat = {};
      };

    })

    .run(function($http, $rootScope){
      $http.get("/src/api/activities.json")
        .then(function(response){
          // console.log(response.data)
          $rootScope.activities = response.data;
        });
    })

    // .run(function($http, $rootScope){
    //   $http.get("/src/" + id + ".json")
    //     .then(function(response){
    //       // console.log("got them stats")
    //       // console.log(response.data)
    //       $rootScope.stats = response.data;
    //     });
    // })




})(); //end IIFE
