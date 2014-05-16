'use strict';

angular.module('advisorframeApp')
  .controller('MainCtrl', function ($scope) {

    $scope.securities = ['BCE', 'MANU'];
    $scope.etfs = ['XTR', 'XRE'];
    $scope.commons = [];
    $scope.mfs = [];

    $scope.addSecurity = function () {
    	$scope.securities.push($scope.etf)
    	$scope.etf = '';


    };       

  });
