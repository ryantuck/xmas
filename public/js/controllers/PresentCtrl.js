// PresentCtrl.js

angular.module('PresentCtrl',[]).controller('PresentController',function($scope, $rootScope, $http, $filter, User){

	// some variables we'll be needing
	$scope.editing = null;
	$scope.presentUser = null;
	$scope.presents = [];
	$scope.tmpPresent = {};

	// compare function for sorting presents after retrieving from server
	function presentCompare(a,b) {
		if (a.index < b.index) 
			return -1;
		if (a.index > b.index)
			return 1;
		return 0;
	}

	// retrieve the user's presents from the server and sort
	$scope.getUserPresents = function() {
		
		// get rootScope user id
		$http.get('/api/users/active')
			.success(function(data) {
				$scope.presentUser = data;
				$scope.presents = $scope.presentUser.presents;

				$scope.presents.sort(presentCompare);
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};

	// go ahead and get them to begin
	$scope.getUserPresents();

	// change $scope.presents indices to reflect those of the ui sortable list
	$scope.updatePresentIndices = function() {
		
		// update indices
		for (var i = 0; i<$scope.presents.length; i++) {
			$scope.presents[i].index = i;
		}

		console.log('reset present indices');
	};

	// pushes updates for present[a] to the server
	$scope.presentClientToDB = function(a) {
		
		var asdf = $scope.presents[a]._id;

		$http.post('/api/presents/' + asdf, {
			title: $scope.presents[a].title,
			notes: $scope.presents[a].notes,
			link: $scope.presents[a].link,
			index: $scope.presents[a].index
		})
			.success(function(data) {
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};

	// returns total presents for UI purposes
	$scope.totalPresents = function() {
		if ($scope.presents !== null)
			return $scope.presents.length;
	};

	// update all presents on db side based on client data
	$scope.updateDBFromPresents = function() {
		for (var j=0; j < $scope.presents.length; j++) {
			$scope.presentClientToDB(j);
		}
	};

	// adds new present based on user input
	$scope.addPresentFromForm = function() {

		// local
		$scope.presents.push({
			title: $scope.newPresentTitle,
			notes: $scope.newPresentNotes,
			link: $scope.newPresentLink,
			index: $scope.presents.length
		});

		// server side
		$http.post('/api/presents', { 
			title: $scope.newPresentTitle,
			notes: $scope.newPresentNotes,
			link: $scope.newPresentLink,
			index: $scope.presents.length
		})
			.success(function(data) {
				console.log('hooray, present added!');
				console.log(data);
				$scope.hookUpPresentIdToUser(data._id);
				$scope.getUserPresents();
			})
			.error(function(data) {
				console.log('error: ' + data);
			});

		// reset fields to blank
		$scope.newPresentTitle = '';
		$scope.newPresentNotes = '';
		$scope.newPresentLink = '';
	};

	// add present id to user's list, since that's how the data is stored server-side
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

	// called when check button is clicked in edit dialog
	$scope.updatePresent = function(idx) {
		$scope.presents[idx].title = $scope.tmpPresent.title;
		$scope.presents[idx].notes = $scope.tmpPresent.notes;
		$scope.presents[idx].link = $scope.tmpPresent.link;
		$scope.presents[idx].index = $scope.tmpPresent.index;

		var tmpId = $scope.presents[idx]._id;

		$http.post('/api/presents/' + tmpId, {
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

		// clear editing mode
		$scope.clearEditing();		
	};

	// opens edit dialog and ensures it's the only one open
	$scope.openEditDialog = function(idx) {

		// close any other open edit dialogs
		$scope.editing = idx;

		$scope.tmpPresent.title = $scope.presents[idx].title;
		$scope.tmpPresent.notes = $scope.presents[idx].notes;
		$scope.tmpPresent.link = $scope.presents[idx].link;
		$scope.tmpPresent.index = $scope.presents[idx].index;

	};

	// resets editing stuff
	$scope.clearEditing = function() {
		$scope.editing = null;
		$scope.tmpPresent = {};
	};


	$scope.deletePresent = function(idx) {

		var tmpId = $scope.presents[idx]._id;

		// actually delete db object
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

	// for UI sortable stuff!
	$scope.sortableOptions = {
		stop: function() {
			console.log('stop');
			$scope.updatePresentIndices();
			$scope.updateDBFromPresents();
			console.log($scope.presents);
		}
	};

	$scope.finalizeUser = function() {

		var tmpId = $scope.presentUser._id;

		$http.post('/api/users/finalize/' + tmpId)
			.success(function(data) {
				// user finalized! boop somewhere else?
			})
			.error(function(data) {
				console.log('error: ' + data);
			});
	};





});




