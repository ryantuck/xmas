
// adminCtrl.js

angular.module('AdminCtrl',[]).controller('AdminController', function($scope,$http) {

	$scope.users = [];
	$scope.presents = [];

	$scope.getUsers = function () {

		$http.get('/api/users')
			.success(function(data) {
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};

	$scope.getPresents = function () {

		$http.get('/api/presents')
			.success(function(data) {
				$scope.presents = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};



});