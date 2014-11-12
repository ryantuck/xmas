// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope,Present,$http){

	$scope.intro = 'hey dude get some prezzies.';

	var p1 = new Present('belt');
	var p2 = new Present('chef knife');
	var p3 = new Present('underwear!');
	var p4 = new Present('dope cufflinks');
	var p5 = new Present('The Art of Computer Programming (Knuth)');
	var p6 = new Present('Coffee Joulies');

	p5.link = 'http://www.amazon.com/Computer-Programming-Volumes-1-4A-Boxed/dp/0321751043/ref=pd_sim_b_2?ie=UTF8&refRID=0HEFJJQ74YD4F0HJTV9X';
	p6.link = 'http://www.joulies.com/products/5-pack#';

	$scope.tmpPresent = {
		title: '',
		notes: '',
		link: ''
	};

	$scope.editing = null;

	// Default set of presents
	$scope.presents = [
		p1,p2,p3,p4,p5,p6
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

	$scope.addPresentFromForm = function() {

		$scope.presents.push({
			title: $scope.newPresentTitle,
			notes: $scope.newPresentNotes,
			link: $scope.newPresentLink
		});

		$http.post('/api/presents', { 
			title: $scope.newPresentTitle,
			notes: $scope.newPresentNotes,
			link: $scope.newPresentLink
		})
			.success(function(data) {
				console.log('hooray, present added!');
			})
			.error(function(data) {
				console.log('error: ' + data);
			});

		$scope.newPresentTitle = '';
		$scope.newPresentNotes = '';
		$scope.newPresentLink = '';
	};

	$scope.removePresent = function(idx) {
		$scope.presents.splice(idx,1);
	};

	$scope.updatePresent = function(idx) {
		$scope.presents[idx].title = $scope.tmpPresent.title;
		$scope.presents[idx].notes = $scope.tmpPresent.notes;
		$scope.presents[idx].link = $scope.tmpPresent.link;

		console.log($scope.presents[idx].title);

		$scope.tmpPresent.title = '';
		$scope.tmpPresent.notes = '';
		$scope.tmpPresent.link = '';

		$scope.editing = null;

		
	};

	$scope.openEditDialog = function(idx) {

		// close any other open edit dialogs
		$scope.editing = idx;

		$scope.tmpPresent.title = $scope.presents[idx].title;
		$scope.tmpPresent.notes = $scope.presents[idx].notes;
		$scope.tmpPresent.link = $scope.presents[idx].link;

		console.log($scope.tmpPresent.title);
	};

	$scope.clearEditing = function() {
		$scope.editing = null;
	};




});




