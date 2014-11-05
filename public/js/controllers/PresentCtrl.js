// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope,Present){

	$scope.intro = 'hey dude get some prezzies.';

	var p1 = new Present('belt');
	var p2 = new Present('chef knife');
	var p3 = new Present('underwear!');
	var p4 = new Present('dope cufflinks');

	p1.priority = 1;
	p2.priority = 3;
	p3.priority = 2;
	p4.priority = 1;


	// Default set of presents
	$scope.presents = [
		p1,p2,p3,p4
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