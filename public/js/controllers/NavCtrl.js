// Nav Controller

angular.module('NavCtrl', []).controller('NavController', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http) {

  // create angular-side rootScope.activeUser variable
  $rootScope.activeUser = null;
  $rootScope.loggedIn = false; // probably don't need this variable!

  // hook it up dog
  // var socket = io.connect('https://secret-dawn-8024.herokuapp.com');
  // //var socket = io.connect('http://localhost');

  // // runs upon connection - ensures we're hooked up
  // socket.on('connection success', function(data) {
  //   console.log("beep boop connected to server");
  //   socket.emit('client connected', {
  //     message: 'connected up in angular dog!'
  //   });
  //   $scope.getActiveUser();
  // });

  // // triggers at interval defined on server side
  // socket.on('user check', function(data) {
  //   socket.emit('client reply', {
  //     message: 'got it bro'
  //   });

  //   $scope.getActiveUser();
  // });

  $scope.getActiveUser();

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
        } else {
          $rootScope.activeUser = data;
        }
      })
      .error(function(data) {
        console.log('error: ' + data);
      });
  };

  // returns active user as string
  $scope.activeUser = function() {
    tmpString = 'not logged in';
    if ($rootScope.activeUser !== null) {
      tmpString = $rootScope.activeUser.name;
    }
    return tmpString;
  };

  // boolean for ng-show/hides for list items
  $scope.rootScopeUserExists = function() {
    if ($rootScope.activeUser !== null)
      return true;
    else
      return false;
  };

  $scope.rootScopeUserIsFinalized = function() {
    if ($rootScope.activeUser !== null) {
      if ($rootScope.activeUser.finalized === true) {
        return true;
      }
    } else
      return false;
  };

  $scope.rootScopeUserId = function() {
    if ($rootScope.activeUser !== null) {
      return $rootScope.activeUser._id;
    } else
      return '';
  };


  $scope.faces = [
    'big-smile-800',
    'o-front-800',
    'o-left-800',
    'o-right-800',
    'smile-left-800',
    'smile-right-800'
  ];

  $scope.randomFace = function() {
    rdm = Math.floor(Math.random() * $scope.faces.length);
    return $scope.faces[rdm];
  };

  $scope.currentFace = 'big-smile-800';

  $scope.$on('$viewContentLoaded', function() {
    if ($location.path() === '/')
      $scope.currentFace = 'big-smile-800';
    else
      $scope.currentFace = $scope.randomFace();
  });

  $scope.switchFace = function() {
    $scope.currentFace = $scope.randomFace();
  };

  $scope.em = 'santa@listmas.io';

  $scope.getActiveName = function() {
    $scope.activeName = $scope.activeUser();
  };


  $scope.saveUsername = function(newName) {
    if ($rootScope.activeUser !== null) {
      var tmpId = $rootScope.activeUser._id;
      $http.post('/api/users/name/' + tmpId, {
          name: newName
        })
        .success(function(data) {
          console.log('changed name');
        })
        .error(function(data) {
          console.log('error: ' + data);
        });

      $scope.getActiveUser();
    }
  };


}]);
