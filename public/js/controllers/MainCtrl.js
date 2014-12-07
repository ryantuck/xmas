angular.module('MainCtrl', []).controller('MainController', function($scope,$http, $location) {

  $scope.signupUserAlreadyExists = false;
  $scope.invalidUsernamePassword = false;
  $scope.noUserFound = false;

  $scope.submitForm = function(isValid) {
    if (isValid) {
      alert('our form is dope');
    }
  };

  $scope.loginSubmit = function(e,p) {

    $http.post('/login', {
      email: e,
      password: p
    })
      .success(function(data) {
        if (data.message === 'logged in') {
          $location.path('/presents');
        }
        else if (data.message === 'wrong password') {
          console.log('wrong password');
          $scope.invalidUsernamePassword = true;
          $scope.loginPassword = '';
        }
        else if (data.message === 'no user found') {
          console.log('no user found');
          $scope.noUserFound = true;
          $scope.loginPassword = '';
        }
        else {
          $scope.loginPassword = '';
          console.log('couldnt log in for some reason');
        }
      })
      .error(function(data) {
        console.log('error: ' + data);
      });
  };

  $scope.signupSubmit = function(n,e,p) {

    $http.post('/signup', {
      email: e,
      password: p,
      nombre: n
    })
    .success(function(data) {
      if (data.message === 'signed up')
        $location.path('/presents');
      else {
        $scope.signupUserAlreadyExists = true;
        $scope.signupName = '';
        $scope.signupEmail = '';
        $scope.signupPassword = '';
        console.log('couldnt sign up');
      }

    })
    .error(function(data) {
      console.log('error: ' + data);
    });

  };



});