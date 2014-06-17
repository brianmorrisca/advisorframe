'use strict';

angular.module('advisorframeApp')
  .controller('MainCtrl', function ($scope) {

    var etfs = $scope.etfs = [],
        commons = $scope.commons = [],
        mfs = $scope.mfs = [];

    $scope.totalEtfs = 0;
    $scope.totalCommons = 0;
    $scope.totalMfs = 0;
    $scope.totalPortfolio = 0;

    $scope.percentEtfs = 0;
    $scope.percentCommons = 0;
    $scope.percentMfs = 0;
    $scope.percentPortfolio = 100;

    var svg = d3.select("#braido").append("svg").attr("width", 700).attr("height", 400);


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
                etfs.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalEtfs += parseInt($scope.securityAmount);
        		$scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = null;
                $scope.securityAmount = null;
        	}
            else if (radioType == "common") {
                commons.push({name:$scope.securityName, amount:$scope.securityAmount});
                $scope.totalCommons += parseInt($scope.securityAmount);
                $scope.totalPortfolio += parseInt($scope.securityAmount);
                $scope.securityName = null;
                $scope.securityAmount = null;
            }
            else if (radioType == "mf") {
                mfs.push({name:$scope.securityName, amount:$scope.securityAmount});
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
                etfs[i].percent = ((parseInt($scope.etfs[i].amount)/$scope.totalPortfolio)*100).toFixed(2);
                if (i == $scope.etfs.length - 1) {
                    break;
                }
            };

            for (var i = 0; i <= commons.length; i++) {
                if (commons.length == 0) {
                    break;
                }
                commons[i].percent = ((parseInt(commons[i].amount)/$scope.totalPortfolio)*100).toFixed(2);
                if (i == commons.length - 1) {
                    break;
                }
            };

            for (var i = 0; i <= mfs.length; i++) {
                if (mfs.length == 0) {
                    break;
                }
                mfs[i].percent = ((parseInt(mfs[i].amount)/$scope.totalPortfolio)*100).toFixed(2);
                if (i == mfs.length - 1) {
                    break;
                }
            };

        };
        $scope.pieUpdate($scope.percentCommons, $scope.percentEtfs, $scope.percentMfs);
    };       

    $scope.pieUpdate = function (common, etf, mf) {
        
        var salesData=[
              {label:"Common", percent:common, color:"#3366CC"},
              {label:"ETF", percent:etf, color:"#DC3912"},
              {label:"MF", percent:mf, color:"#FF9900"}
            ];

            svg.append("g").attr("id","salespie");
              
            gradPie.draw("salespie", portfolioPercentages(), 200, 200, 100);

            function portfolioPercentages(){

              return salesData.map(function(d){ 
                return {label:d.label, value:d.percent, color:d.color};});
            }
    };

  });
