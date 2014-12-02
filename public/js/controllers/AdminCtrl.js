// adminCtrl.js

angular.module('AdminCtrl', []).controller('AdminController', function($scope, $http) {

    $scope.users = [];
    $scope.presents = [];

    var socket = io.connect('http://localhost:8080');
    socket.on('news', function(data) {
        console.log("omfg its working!");
        console.log(data);
        socket.emit('my other event', {
            my: 'data'
        });
    });

    $scope.getUsers = function() {

        $http.get('/api/users')
            .success(function(data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };

    $scope.getPresents = function() {

        $http.get('/api/presents')
            .success(function(data) {
                $scope.presents = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };

    $scope.editPresent = function() {

        var tmpId = $scope.presents[1]._id;
        $scope.presents[1].title = 'edited title';

        console.log(tmpId);

        $http.put('/api/presents/' + tmpId, {
                title: $scope.presents[1].title,
                notes: $scope.presents[1].notes,
                link: $scope.presents[1].link
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

    $scope.deletePresent = function() {

        var tmpId = $scope.presents[0]._id;

        $http.delete('/api/presents/' + tmpId)
            .success(function(data) {
                console.log(data);
                $scope.getPresents();
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };

    $scope.deleteUser = function() {
        var tmpId = $scope.users[0]._id;

        $http.delete('/api/users/' + tmpId)
            .success(function(data) {
                console.log(data);
                $scope.getUsers();
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };

    $scope.addPresentsToUser = function() {

        var tmpId = $scope.users[1]._id;
        var prId = $scope.presents[1]._id;

        $http.put('/api/users/' + tmpId, {
                pId: prId
            })
            .success(function(data) {
                console.log(data);
                $scope.getUsers();
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };

    $scope.getUserPresent1 = function() {

        var tmpId = $scope.users[1]._id;

        $http.get('/api/users/' + tmpId)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('error: ' + data);
            });
    };

    $scope.printUser1Present0 = function() {

        console.log('User 1 Present 0');
        console.log($scope.users[1].presents[0].title);

    };



});
