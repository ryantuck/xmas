
// User Service

angular.module('UserService',[]).service('User', function($http,$rootScope) {

	

	function userObject() {
		if ($rootScope.activeUser) 
			return $rootScope.activeUser;
		else
			return null;
	}

	function userName() {
		if (userObject())
			return $rootScope.local.email;
		else
			return null;
	}

	function userPresents() {
		if (userObject())
			return $rootScope.activeUser.presents;
		else
			return null;
	}

});