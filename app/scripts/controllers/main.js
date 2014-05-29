'use strict';

angular.module('advisorframeApp')
  .controller('MainCtrl', function ($scope) {

    var etfs = $scope.etfs = [];
    $scope.commons = [];
    $scope.mfs = [];

    $scope.totalEtfs = 0;
    $scope.totalCommons = 0;
    $scope.totalMfs = 0;
    $scope.totalPortfolio = 0;

    $scope.percentEtfs = 0;
    $scope.percentCommons = 0;
    $scope.percentMfs = 0;
    $scope.percentPortfolio = 100;


    $scope.addSecurity = function () {

        if ($scope.securityName == null) {
            alert("Must input a security name");
            return false;
        }

        if ($scope.securityAmount == null) {
            alert("Must input a number");
            return false;
        };

        if ($scope.securityType == null){
            alert("Must select a category (ETF, Common, Mutual Fund)");
            return false;
        }

        if (isNaN($scope.securityAmount))
        {
            alert("Must input a number");
            return false;
        }
        else {

            var radioType = $scope.securityType;

            if (radioType == "etf"){
                $scope.etfs.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalEtfs += parseInt($scope.securityAmount);
        		$scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = null;
                $scope.securityAmount = null;
        	}
            else if (radioType == "common") {
                $scope.commons.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalCommons += parseInt($scope.securityAmount);
                $scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = null;
                $scope.securityAmount = null;
            }
            else if (radioType == "mf") {
                $scope.mfs.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalMfs += parseInt($scope.securityAmount);
                $scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = null;
                $scope.securityAmount = null;
            };

            $scope.percentEtfs = (($scope.totalEtfs / $scope.totalPortfolio)*100).toFixed(2);
            $scope.percentCommons = (($scope.totalCommons / $scope.totalPortfolio)*100).toFixed(2);
            $scope.percentMfs = (($scope.totalMfs / $scope.totalPortfolio)*100).toFixed(2);

            

            for (var i = 0; i <= $scope.etfs.length; i++) {
                if ($scope.etfs.length == 0) {
                    break;
                }
                $scope.etfs[i].percent = ((parseInt($scope.etfs[i].amount)/$scope.totalPortfolio)*100).toFixed(2);
                if (i == $scope.etfs.length - 1) {
                    break;
                }
            };

            for (var i = 0; i <= $scope.commons.length; i++) {
                if ($scope.commons.length == 0) {
                    break;
                }
                $scope.commons[i].percent = ((parseInt($scope.commons[i].amount)/$scope.totalPortfolio)*100).toFixed(2);
                if (i == $scope.commons.length - 1) {
                    break;
                }
            };

            for (var i = 0; i <= $scope.mfs.length; i++) {
                if ($scope.mfs.length == 0) {
                    break;
                }
                $scope.mfs[i].percent = ((parseInt($scope.mfs[i].amount)/$scope.totalPortfolio)*100).toFixed(2);
                if (i == $scope.mfs.length - 1) {
                    break;
                }
            };

        };
    };       

  });
