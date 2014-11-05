// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope){

	$scope.tagline = 'i want presents!';
	$scope.intro = 'hey dude get some prezzies.';

	// Default set of presents
	$scope.presents = [
		{title: 'moleskine', priority: 1},
		{title: 'chef knife', priority: 3},
		{title: 'unders', priority: 2},
	];

	$scope.getTotalPresents = function() {
		return $scope.presents.length;
	};


});