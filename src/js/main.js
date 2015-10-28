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
            // console.log("stats page controller: " + id);
            // $location.path('/stats');
            $http.get("https://gentle-headland-1205.herokuapp.com/api/activities/"+ id + "/stats")
            // "https://gentle-headland-1205.herokuapp.com/api/activities/1/stats"
              .then(function(response){
                // console.log("got them stats")
                // console.log(response.data);
                $rootScope.stats = response.data;
                graph();
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

    .controller("newActivityController", function($http){
      this.activity = {};
      this.createActivity = function(activity){
        console.log(this.activity);
        $http.post("https://gentle-headland-1205.herokuapp.com/api/activities/", this.activity)
        .then(function(repsonse){location.reload()},
          function(response){console.log("failure")});
        this.activity = {};
      };

    })

    .controller("newStatController", function($http, $routeParams){
      this.stat = {};
      this.createStat = function(stat){
        var id = $routeParams.id
         $http.post("https://gentle-headland-1205.herokuapp.com/api/activities/"+id+"/stats/", this.stat)
        .then(function(repsonse){location.reload()},
          function(response){console.log("failure")});
        console.log(this.stat.timestamp.toDateString("yyyy-MM-dd"));
        console.log(this.stat)
        console.log($routeParams.id)
        this.stat = {};
      };

    })

    .run(function($http, $rootScope){
      // $http.get("/src/api/activities.json")
      $http.get("https://gentle-headland-1205.herokuapp.com/activities")
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

  function graph(){
    var data = [
    [2000,45],
    [2001,4],
    [2002,2],
    [2003,2],
    [2004,4],
    [2005,12],
    [2006,23],
    [2007,54],
    [2008,12],
    [2009,1]
  ];
    svg = d3.select("svg");
    g = svg.append("g");
    g.attr("transform", "translate(100,50)");

    x = d3.scale.linear()
        .domain([1999, 2010])  // Fill in the domain values for the x axis
        .range([0, 800]);
    y = d3.scale.linear()
        .domain([0, 60])  // Fill in the domain values for the y axis
        .range([400, 0]);

    x_axis = d3.svg.axis().scale(x).orient("bottom").ticks(5).tickFormat(d3.format("d"));
    y_axis = d3.svg.axis().scale(y).orient("left").ticks(4);

    g.call(y_axis);

    gx = g.append("g")
    gx.call(x_axis);
    gx.attr("transform", "translate(0,400)");

    // Okay, now all of your axes are set up.  Add code to draw points here.

    // g.append( ). //Fill in the parens and add stuff after the last dot, then make more of these lines.

 };



})(); //end IIFE
