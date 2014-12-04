angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/presents', {
			templateUrl: 'views/presents.html',
			controller: 'PresentController'
		})

		.when('/admin', {
			templateUrl: 'views/admin.html',
			controller: 'AdminController'
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'SignupController'
		})

		.when('/noUser', {
			templateUrl: 'views/noUser.html'
		})

		.when('/list/:userId', {
			templateUrl: 'views/userlist.html'
		});

	$locationProvider.html5Mode(true);

}]);