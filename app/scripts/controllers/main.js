'use strict';

angular.module('advisorframeApp')
  .controller('MainCtrl', function ($scope) {

    $scope.etfs = [];
    $scope.commons = [];
    $scope.mfs = [];

    $scope.totalEtfs = 0;
    $scope.totalCommons = 0;
    $scope.totalMfs = 0;
    $scope.totalPortfolio = 0;


    $scope.addSecurity = function () {
        
        if (isNaN($scope.securityAmount))
        {
            alert("Must input a number");
        }
        else {
            var radioType = $scope.securityType;

            if (radioType == "etf"){
                $scope.etfs.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalEtfs += parseInt($scope.securityAmount);
        		$scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = '';
                $scope.securityAmount = '';
        	}
            else if (radioType == "common") {
                $scope.commons.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalCommons += parseInt($scope.securityAmount);
                $scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = '';
                $scope.securityAmount = '';
            }
            else if (radioType == "mf") {
                $scope.mfs.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalMfs += parseInt($scope.securityAmount);
                $scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = '';
                $scope.securityAmount = '';
            };
        };
    };       

  });
