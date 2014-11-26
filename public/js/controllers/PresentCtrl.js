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

	$scope.totalPresents = function() {
		return $scope.presents.length;
	};

	$scope.test = function() {
		console.log($rootScope.activeUser);
		console.log(User.userName());
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

		console.log($scope.presents[idx].title);

		var tmpId = $scope.presents[idx]._id;

		$http.put('/api/presents/' + tmpId, {
			title: $scope.presents[idx].title,
			notes: $scope.presents[idx].notes,
			link: $scope.presents[idx].link
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




