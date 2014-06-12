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
                $scope.etfs[i].percent = ((parseInt($scope.etfs[i].amount)/$scope.totalPortfolio)*100).toFixed(2);
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
    };       

    $scope.createPie = function () {

            var gradPie={};
            
            var pie = d3.layout.pie().sort(null).value(function(d) {return d.value;});
                    
            createGradients = function(defs, colors, r){    
                var gradient = defs.selectAll('.gradient')
                    .data(colors).enter().append("radialGradient")
                    .attr("id", function(d,i){return "gradient" + i;})
                    .attr("gradientUnits", "userSpaceOnUse")
                    .attr("cx", "0").attr("cy", "0").attr("r", r).attr("spreadMethod", "pad");
                    
                gradient.append("stop").attr("offset", "0%").attr("stop-color", function(d){ return d;});

                gradient.append("stop").attr("offset", "30%")
                    .attr("stop-color",function(d){ return d;})
                    .attr("stop-opacity", 1);
                    
                gradient.append("stop").attr("offset", "70%")
                    .attr("stop-color",function(d){ return "black";})
                    .attr("stop-opacity", 1);
            }
            
            gradPie.draw = function(id, data, cx, cy, r){
                var gPie = d3.select("#"+id).append("g")
                    .attr("transform", "translate(" + cx + "," + cy + ")");
                    
                createGradients(gPie.append("defs"), data.map(function(d){ return d.color; }), 2.5*r);

                gPie.selectAll("path").data(pie(data))
                    .enter().append("path").attr("fill", function(d,i){ return "url(#gradient"+ i+")";})
                    .attr("d", d3.svg.arc().outerRadius(r))
                    .each(function(d) { this._current = d; });
            }
            
            gradPie.transition = function(id, data, r) {
                function arcTween(a) {
                  var i = d3.interpolate(this._current, a);
                  this._current = i(0);
                  return function(t) { return d3.svg.arc().outerRadius(r)(i(t));  };
                }
                
                d3.select("#"+id).selectAll("path").data(pie(data))
                    .transition().duration(750).attrTween("d", arcTween); 
            }   
            
            this.gradPie = gradPie;  
                  
    };

    $scope.pieUpdate = function () {
        


        var salesData=[
              {label:"Common", color:"#3366CC"},
              {label:"ETF", color:"#DC3912"},
              {label:"MF", color:"#FF9900"}
            ];

            var svg = d3.select("#braido").append("svg").attr("width", 700).attr("height", 400);

            svg.append("g").attr("id","salespie");
              
            gradPie.draw("salespie", randomData(), 200, 200, 160);

            function changeData(){
              gradPie.transition("salespie", randomData(), 160);
            }

            function randomData(){



              return salesData.map(function(d){ 
                return {label:d.label, value:1000*Math.random(), color:d.color};});
            }
    };

  });
