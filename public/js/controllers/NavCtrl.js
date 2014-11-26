// Nav Controller

angular.module('NavCtrl', []).controller('NavController', function($scope, $rootScope, $location, $http) {

  $scope.tagline = 'nevermind.';

  $scope.isActive = function(route) {
    return route === $location.path();
  };

  $scope.logOut = function() {
    $http.get('/logout')
      .success(function(data) {
        console.log('logged out!');
      })
      .error(function(data) {
        console.log('error: ' + data);
      });
  };

  $scope.combo = function() {
    $scope.logOut();
    $scope.isLoggedIn();
  };

  $rootScope.activeUser = null;
  $rootScope.loggedIn = false;

  $scope.isLoggedIn = function() {

    $http.get('/checklogin')
      .success(function(data) {
        console.log(data);
        if (data === true)
          $rootScope.loggedIn = true;
        else
          $rootScope.loggedIn = false;
      })
      .error(function(data) {
        console.log('error: ' + data);
      });
  };

  // returns active user name, or 'not logged in' message
  $scope.getActiveUser = function() {
    $scope.isLoggedIn();

    $http.get('/api/users/active')
      .success(function(data) {
        console.log(data);
        if (data.message) {
          console.log('data message');
          $rootScope.activeUser = null;
        }
        else {
          console.log('got active user bro');
          $rootScope.activeUser = data.local.email;
          console.log($rootScope.activeUser);
        }
      })
      .error(function(data) {
        console.log('error: ' + data);
      });

      // if ($rootScope.activeUser === null)
      //   return 'not logged in';
      // else
      //   return $rootScope.activeUser;
  };

  $scope.activeUser = function () {

    tmpString = 'not logged in';

    if ($rootScope.activeUser)
      tmpString = $rootScope.activeUser;

    return tmpString;

  };



});
