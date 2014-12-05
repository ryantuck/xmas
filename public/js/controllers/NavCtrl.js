// Nav Controller

angular.module('NavCtrl', []).controller('NavController', function($scope, $rootScope, $location, $http) {

  // create angular-side rootScope.activeUser variable
  $rootScope.activeUser = null;
  $rootScope.loggedIn = false;    // probably don't need this variable!

  // hook it up dog
  var socket = io.connect('http://localhost:8080');
  
  // runs upon connection - ensures we're hooked up
  socket.on('connection success', function(data) {
      console.log("beep boop connected to server");
      socket.emit('client connected', {
          message: 'connected up in angular dog!'
      });
      $scope.getActiveUser();
  });

  // triggers at interval defined on server side
  socket.on('user check', function(data) {
    socket.emit('client reply', {
      message: 'got it bro'
    });

    $scope.getActiveUser();
  });

  // highlights the current selected tab
  $scope.isActive = function(route) {
    return route === $location.path();
  };

  $scope.logOut = function() {
    $http.get('/logout')
      .success(function(data) {
        console.log('logged out!');
        // pop back to home screen once logged out
        $location.path('');
        $scope.getActiveUser();
      })
      .error(function(data) {
        console.log('error: ' + data);
      });


  };

  // returns active user name, or 'not logged in' message
  $scope.getActiveUser = function() {

    $http.get('/api/users/active')
      .success(function(data) {
        if (data.message) {
          $rootScope.activeUser = null;
        }
        else {
          $rootScope.activeUser = data;
        }
      })
      .error(function(data) {
        console.log('error: ' + data);
      });
  };

  // returns active user as string
  $scope.activeUser = function () {
    tmpString = 'not logged in';
    if ($rootScope.activeUser)
      tmpString = $rootScope.activeUser.local.email;
    return tmpString;
  };

  // boolean for ng-show/hides for list items
  $scope.rootScopeUserExists = function() {
    if ($rootScope.activeUser !== null)
      return true;
    else
      return false;
  };




});
