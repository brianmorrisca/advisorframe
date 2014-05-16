'use strict';

angular.module('advisorframeApp')
  .controller('MainCtrl', function ($scope) {

    $scope.securities = ['BCE', 'MANU'];
    $scope.etfs = ['XTR', 'XRE'];
    $scope.commons = [];
    $scope.mfs = [];

    $scope.addSecurity = function () {

        var myRadioButton = $scope.securityType;

        if (myRadioButton == "etf"){
    		$scope.etfs.push($scope.security);
    		$scope.security = '';
    	}
        else (myRadioButton == "common") {
            $scope.commons.push($scope.security);
            $scope.security = '';
        }
        else (myRadioButton == "mf") {
            $scope.mfs.push($scope.security);
            $scope.security = '';
        };

    };       

  });
