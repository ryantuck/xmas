// List Controller
// for finalized lists


angular.module('ListCtrl', []).controller('ListController', function($scope, $rootScope, $http, $location) {


        $scope.presentUser = null;
        $scope.presents = [];

        $scope.sameUser = false;

        $scope.hovering = null;

        // extracts user id from url, obv
        function getIdFromURL() {
            var x = $location.path();
            x = x.split('/list/');
            x = x[1];
            return x;
        }

        // compare function for sorting presents after retrieving from server
        function presentCompare(a, b) {
            if (a.index < b.index)
                return -1;
            if (a.index > b.index)
                return 1;
            return 0;
        }

        $scope.getUserPresents = function() {

            var tmpId = getIdFromURL();

            // get rootScope user id
            $http.get('/api/users/' + tmpId)
                .success(function(data) {
                    $scope.presentUser = data;
                    $scope.presents = $scope.presentUser.presents;

                    $scope.presents.sort(presentCompare);

                    if ($scope.presentUser._id === $rootScope.activeUser._id) {
                        $scope.sameUser = true;
                    }
                })
                .error(function(data) {
                    console.log('error: ' + data);
                });
        };

        $scope.test = function() {
            $scope.getUserPresents();
            console.log('getting user presents for user ' + getIdFromURL());
            $scope.claim(2);
        };

        // gets rootScope.activeUser and runs a finalized check
        $scope.getActiveUser = function() {

            $http.get('/api/users/active')
                .success(function(data) {
                    if (data.message) {
                        $rootScope.activeUser = null;
                        $location.path('/login');
                    } else {
                        $rootScope.activeUser = data;

                        $scope.getUserPresents();
                    }
                })
                .error(function(data) {
                    console.log('error: ' + data);
                });
        };

        $scope.isClaimed = function(idx) {
            if ($scope.presents[idx].claimedBy === null)
                return false;
            else
                return true;
        };

        $scope.isClaimedByActiveUser = function(idx) {
            if ($scope.presents[idx].claimedBy === $rootScope.activeUser._id)
                return true;
            else
                return false;
        };

        $scope.isClaimedByOtherUser = function(idx) {
            if ($scope.isClaimed(idx) && !$scope.isClaimedByActiveUser(idx))
                return true;
            else
                return false;
        };

        $scope.claim = function(idx) {
            $http.post('/api/presents/claim/' + $scope.presents[idx]._id + '/' + $rootScope.activeUser._id)
                .success(function(data) {
                    console.log('claimed present!');
                    $scope.getUserPresents();

                })
                .error(function(data) {
                    console.log('error: ' + data);
                });
        };

        $scope.unClaim = function(idx) {
            $http.post('/api/presents/unclaim/' + $scope.presents[idx]._id + '/' + $rootScope.activeUser._id)
                .success(function(data) {
                    console.log('unclaimed present');
                    $scope.getUserPresents();
                })
                .error(function(data) {
                    console.log('error: ' + data);
                });
        };

        $scope.getActiveUser();

        $scope.getUserPresents();

        $scope.listURL = 'http://listmas.io' + $location.path();



    })
    .directive('selectOnClick', function() {
        // Linker function
        return function(scope, element, attrs) {
            element.bind('click', function() {
                this.select();
            });
        };
    });
