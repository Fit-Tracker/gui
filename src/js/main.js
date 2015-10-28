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
            $http.get("https://gentle-headland-1205.herokuapp.com/api/activities/"+ id + "/stats")
              .then(function(response){
                $rootScope.stats = response.data;
                graph(response.data);
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
      $http.get("https://gentle-headland-1205.herokuapp.com/activities")
        .then(function(response){
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

  function graph(data){

    svg = d3.select("svg");
    g = svg.append("g");
    g.attr("transform", "translate(100,50)");

    x = d3.scale.linear()
        .domain([1, 31])  // Fill in the domain values for the x axis
        .range([0, 800]);
    y = d3.scale.linear()
        .domain([0, 100])  // Fill in the domain values for the y axis
        .range([400, 0]);

    x_axis = d3.svg.axis().scale(x).orient("bottom").ticks(31).tickFormat(d3.format("d"));
    y_axis = d3.svg.axis().scale(y).orient("left").ticks(4);

    g.call(y_axis);

    gx = g.append("g")
    gx.call(x_axis);
    gx.attr("transform", "translate(0,400)");

    for(var i = 0; i < data.length; i++){
      var date = new Date(data[i].timestamp);
      var yData = data[i].stat;
      g.append("circle")
        .attr("cx", x(date.getDate()))
        .attr("cy", y(yData))
        .attr("r", 10);
    };

 };


})(); //end IIFE
