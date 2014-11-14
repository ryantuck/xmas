// Nav Controller

angular.module('NavCtrl', []).controller('NavController', function($scope, $location, $http) {
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
});
