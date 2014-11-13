
// Nav Controller

angular.module('NavCtrl',[]).controller('NavController',function($scope,$location) {

	$scope.isActive = function(route) {
		return route ===$location.path();
	};

});