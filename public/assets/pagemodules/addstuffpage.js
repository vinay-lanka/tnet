function submitfactory(){
    var form = $('#registerfac');
    var formData = $(form).serialize();
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/factories/registerfactory",
        data: formData
    }).done(function(response) {
        console.log(response);
        alert(response);
        form[0].reset();
    })
}
function submitshopfloor(){
    var form = $('#registershop');
    var formData = $(form).serialize();
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/shopfloors/registershopfloor",
        data: formData
    }).done(function(response) {
        console.log(response);
        alert(response);
        form[0].reset();
    })
}
function submitmachine(){
    var form = $('#registermac');
    var formData = $(form).serialize();
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/machines/registermachine",
        data: formData
    }).done(function(response) {
        console.log(response);
        alert(response);
        form[0].reset();
    })
}
$(document).ready(function () {
    App.init();
});
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
app.controller('getfactories', function($scope, $http) {
    $scope.getfac = function() {
        $http.get("/factories/listfactories").then(function(response) {
        console.log(response.data);
        $scope.factories = response.data;
    });
    };
});
app.controller('getfactoriesagain', function($scope, $http) {
    $scope.getfacagain = function() {
        $http.get("/factories/listfactories").then(function(response) {
        console.log(response.data);
        $scope.factories1 = JSON.parse(JSON.stringify(response.data));
    });
    };
    $scope.onChange = function(fid) {
        $http.get("/shopfloors/listshopfloors",{
            params: {factoryid: fid}
        }).then(function(response) {
        console.log(response.data);
        $scope.shopfloors = JSON.parse(JSON.stringify(response.data));
        $scope.shopdroplistvar=true;
    });
    };
});