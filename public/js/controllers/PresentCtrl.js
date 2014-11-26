// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope, $rootScope, $http, $filter, User){

	$scope.intro = 'hey dude get some prezzies.';
	$scope.editing = null;

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

	$scope.getPresents();

	$scope.sortPresents = function(e,ui) { // need to pass in e, ui for sortable shit
		console.log("sorting presents called");

		if ($scope.preesents !== null)
			$scope.resetPresentIndices();

		console.log($scope.presents);

	};

	$scope.resetPresentIndices = function() {
		
		// update indices
		for (var i = 0; i<$scope.presents.length; i++) {
			$scope.presents[i].index = i;
		}

		// should save to DB here
		// but, there's some bullshit issue if presentClientToDB is here
		// currently located on Test button ng-click


	};

	$scope.presentClientToDB = function(a) {
		
		var asdf = $scope.presents[a]._id;

		$http.put('/api/presents/' + asdf, {
			title: $scope.presents[a].title,
			notes: $scope.presents[a].notes,
			link: $scope.presents[a].link,
			index: $scope.presents[a].index
		})
			.success(function(data) {
				console.log(data);
				console.log('hooray, present was edited!');
				$scope.getPresents();
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};

	$scope.totalPresents = function() {
		if ($scope.presents !== null)
			return $scope.presents.length;
	};

	$scope.test = function() {
		$scope.presentClientToDB(0);
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

	$scope.updatePresent = function(idx) {
		$scope.presents[idx].title = $scope.tmpPresent.title;
		$scope.presents[idx].notes = $scope.tmpPresent.notes;
		$scope.presents[idx].link = $scope.tmpPresent.link;
		$scope.presents[idx].index = $scope.tmpPresent.index;

		console.log($scope.presents[idx].title);

		var tmpId = $scope.presents[idx]._id;

		$http.put('/api/presents/' + tmpId, {
			title: $scope.presents[idx].title,
			notes: $scope.presents[idx].notes,
			link: $scope.presents[idx].link,
			index: $scope.presents[idx].index
		})
			.success(function(data) {
				console.log(data);
				console.log('hooray, present was edited!');
				$scope.getPresents();
			})
			.error(function(data) {
				console.log('error: ' + data);
			});


		$scope.tmpPresent.title = '';
		$scope.tmpPresent.notes = '';
		$scope.tmpPresent.link = '';
		$scope.tmpPresent.index = '';

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



	$scope.deletePresent = function(idx) {

		var tmpId = $scope.presents[idx]._id;

		$http.delete('/api/presents/' + tmpId)
			.success(function(data) {
				console.log(data);
				$scope.getPresents();
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};




});




