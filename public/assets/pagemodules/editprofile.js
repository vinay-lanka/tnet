$(document).ready(function() {
    App.init();
    Demo.init();
    PageDemo.init();
});
var app = angular.module('dashboardApp', []);
app.controller('userdetails', function ($scope, $http) {
    $http.get("/user/userdetails").then(function (response) {
        console.log("Fetching user details");
        $scope.userdetails = response.data;
        console.log($scope.userdetails);
        if (response.data.admin == 1) {
            $scope.adminVar = true;
        } else {
            $scope.adminVar = false;
        }
    });
});