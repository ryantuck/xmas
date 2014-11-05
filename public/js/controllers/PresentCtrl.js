// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope,Present){

	$scope.intro = 'hey dude get some prezzies.';

	var p1 = new Present('halo 5');


	// Default set of presents
	$scope.presents = [
		{title: 'moleskine', priority: 1},
		{title: 'chef knife', priority: 3},
		{title: 'unders', priority: 2},
		p1
	];

	$scope.getTotalPresents = function() {
		return $scope.presents.length;
	};

	$scope.addPresent = function() {
		
		$scope.presents.push({
			title: $scope.formPresentText,
			priority: 1
		});

		$scope.formPresentText = '';
	};

	$scope.removePresent = function(index) {

	};

});