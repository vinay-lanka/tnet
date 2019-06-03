$(document).ready(function () {
    App.init();
    // Demo.init();
    // PageDemo.init();
});
function makeuser(){
    var form = $('#makeuser');
    var formData = $(form).serialize();
    $.ajax({
        type: 'POST',
        url: "/user/makeuser",
        data: formData
    }).done(function(response) {
        console.log(response);
        alert(response);
        form[0].reset();
    })
}
function removeuser(){
    var form = $('#removeuser');
    var formData = $(form).serialize();
    console.log(formData)
    $.ajax({
        type: 'POST',
        url: "/user/removeuser",
        data: formData
    }).done(function(response) {
        console.log(response);
        alert(response);
        form[0].reset();
        // document.getElementById('removeform').reset()
    })
}
var app = angular.module('dashboardApp', []);
app.controller('userdetails', function ($scope, $http) {
    $http.get("/user/userdetails").then(function (response) {
        console.log("Fetching user details");
        $scope.userdetails = response.data;
        console.log($scope.userdetails);
        if(response.data.admin==1){
            $scope.adminVar = true;
        }else{
            $scope.adminVar = false;
        }
    });
});
app.controller('tabcontroller', function($scope) {
    $scope.showadd = true;
    $scope.showremove = false;
    $scope.showmodify=false;
    $scope.showadduser = function() {
        $scope.showadd = true;
        $scope.showremove = false;
        $scope.showmodify=false;
    }
    $scope.showremoveuser = function() {
        $scope.showremove = true;
        $scope.showadd = false;
        $scope.showmodify=false;
    }
    $scope.showmodifyuser = function() {
        $scope.showremove = false;
        $scope.showadd = false;
        $scope.showmodify=true;
    }
});
app.controller('getusers', function($scope, $http) {
    $http.get("/user/listusers").then(function (response) {
        console.log(response.data);
        $scope.users = response.data;
    });
});