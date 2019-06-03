$(document).ready(function () {
    App.init();
    Demo.init();
    // PageDemo.init();
});
// var bar = new ProgressBar.Circle(container1, {
// 	strokeWidth: 6,
// 	easing: 'easeInOut',
// 	duration: 1400,
// 	color: '#FFEA82',
// 	trailColor: '#eee',
// 	trailWidth: 1,
// 	svgStyle: null
// });

// bar.animate(1.01);  // Number from 0.0 to 1.0
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
app.controller('selection', function ($scope, $http) {
    $scope.getfactories = function () {
        $scope.factoriesvar = true;
        $scope.shopfloorsvar = false;
        $scope.machinesvar = false;
        $http.get("/factories/listfactories").then(function (response) {
            console.log(response.data);
            $scope.factories = response.data;
        });
    };
    $scope.getfactories();
    $scope.deletefactory = function (fid) {
        console.log(fid);
        $http.get("/factories/deletefactories", {
            params: { factoryid: fid }
        }).then(function (response) {
            console.log(response);
            if (response.data.message == 'deleted') {
                window.location = "/selectmachine";
            } else {
                alert(response.message);
            }
        });
    };
    $scope.getshopfloors = function (fid) {
        console.log(fid);
        $scope.selectedfactory = fid;
        $scope.factoriesvar = false;
        $scope.shopfloorsvar = true;
        $scope.machinesvar = false;
        $http.get("/shopfloors/listshopfloors", {
            params: { factoryid: $scope.selectedfactory }
        }).then(function (response) {
            console.log(response.data);
            $scope.shopfloors = response.data;
        });
    };
    $scope.deleteshopfloor = function (sid) {
        console.log(sid);
        $http.get("/shopfloors/deleteshopfloor", {
            params: { shopfloorid: sid }
        }).then(function (response) {
            console.log(response);
            if (response.data.message == 'deleted') {
                window.location = "/selectmachine";
            } else {
                alert(response.message);
            }
        });
    };
    $scope.getmachines = function (sid) {
        console.log(sid);
        $scope.selectedshopfloor = sid;
        $scope.factoriesvar = false;
        $scope.shopfloorsvar = false;
        $scope.machinesvar = true;
        $http.get("/machines/listmachines", {
            params: { shopfloorid: $scope.selectedshopfloor }
        }).then(function (response) {
            console.log(response.data);
            $scope.machines = response.data;
        });
    };
    $scope.getmacdetails = function (mid) {
        console.log(mid);
        $scope.selectedmachine = mid;
        $http.get("/machines/showmachine", {
            params: { machineid: $scope.selectedmachine }
        }).then(function (response) {
            console.log(response);
            if (response.data.message == 'fetched') {
                window.location = "/dashboard";
            } else {
                alert(response.message);
            }
        });
    };
    $scope.makedefault = function (mid) {
        // $scope.machinesvar=false;
        $http.get("/machines/makedefault", {
            params: { machineid: mid }
        }).then(function (response) {
            // $scope.machinesvar=true;
            $http.get("/machines/listmachines", {
                params: { shopfloorid: $scope.selectedshopfloor }
            }).then(function (response) {
                console.log(response.data);
                $scope.machines = response.data;
            });
            console.log(response);
            alert(response.data.message);
        });
        // $scope.$apply();
    };
    $scope.deletemachine = function (mid) {
        console.log(mid);
        $http.get("/machines/deletemachine", {
            params: { machineid: mid }
        }).then(function (response) {
            console.log(response);
            if (response.data.message == 'deleted') {
                // window.location = "/selectmachine";
                $scope.getmachines($scope.selectedshopfloor);
            } else {
                alert(response.message);
            }
        });
    };
});
// app.controller('factories', function($scope, $http) {
// 	$http.get("/factories/listfactories").then(function (response) {
// 		console.log(response.data);
// 		$scope.factories = response.data;
// 	});
// });
// app.controller('shopfloors', function($scope, $http) {

// });