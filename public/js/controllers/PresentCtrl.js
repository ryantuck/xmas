// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope,Present){

	$scope.intro = 'hey dude get some prezzies.';

	var p1 = new Present('belt');
	var p2 = new Present('chef knife');
	var p3 = new Present('underwear!');
	var p4 = new Present('dope cufflinks');
	var p5 = new Present('The Art of Computer Programming (Knuth)');

	p5.link = 'http://www.amazon.com/Computer-Programming-Volumes-1-4A-Boxed/dp/0321751043/ref=pd_sim_b_2?ie=UTF8&refRID=0HEFJJQ74YD4F0HJTV9X';



	// Default set of presents
	$scope.presents = [
		p1,p2,p3,p4,p5
	];

	$scope.getTotalPresents = function() {
		return $scope.presents.length;
	};

	$scope.addPresent = function() {
		
		$scope.presents.push({
			title: $scope.formPresentText,
		});

		$scope.formPresentText = '';
	};

	$scope.removePresent = function(idx) {
		$scope.presents.splice(idx,1);
	};

});