// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope, $rootScope, $http, $filter, User){

	$scope.editing = null;
	$scope.presentUser = null;
	$scope.presents = [];

	$scope.getUserPresents = function() {
		
		// get rootScope user id
		$http.get('/api/users/active')
			.success(function(data) {
				$scope.presentUser = data;
				$scope.presents = $scope.presentUser.presents;
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};

	$scope.getUserPresents();

	

	$scope.sortPresents = function(e,ui) { // need to pass in e, ui for sortable shit

		if ($scope.presents !== null)
			$scope.resetPresentIndices();

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
				$scope.getUserPresents();
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
				console.log(data);
				// add present (or id?) to list of user's presents
				$scope.hookUpPresentIdToUser(data._id);
			})
			.error(function(data) {
				console.log('error: ' + data);
			});

		$scope.newPresentTitle = '';
		$scope.newPresentNotes = '';
		$scope.newPresentLink = '';
	};

	$scope.hookUpPresentIdToUser = function(prId) {

		var tmpUserId = $scope.presentUser._id;

		$http.put('/api/users/' + tmpUserId, {
                pId: prId
            })
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
	};

	$scope.updatePresent = function(idx) {
		$scope.presents[idx].title = $scope.tmpPresent.title;
		$scope.presents[idx].notes = $scope.tmpPresent.notes;
		$scope.presents[idx].link = $scope.tmpPresent.link;
		$scope.presents[idx].index = $scope.tmpPresent.index;

		var tmpId = $scope.presents[idx]._id;

		$http.put('/api/presents/' + tmpId, {
			title: $scope.presents[idx].title,
			notes: $scope.presents[idx].notes,
			link: $scope.presents[idx].link,
			index: $scope.presents[idx].index
		})
			.success(function(data) {
				$scope.getUserPresents();
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
	};

	$scope.clearEditing = function() {
		$scope.editing = null;
	};



	$scope.deletePresent = function(idx) {

		var tmpId = $scope.presents[idx]._id;

		$http.delete('/api/presents/' + tmpId)
			.success(function(data) {
				$scope.getUserPresents();
			})
			.error(function(data) {
				console.log('error: ' + data);
			});

		// delete present ID from user's list of presents
		$http.post('/api/users/' + $scope.presentUser._id + '/presents/' + tmpId)
			.success(function(data) {
				$scope.getUserPresents();
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};




});




