angular.module('UNESCODistributionReporting', [])
	.controller('mainCtrl', ['$scope', function($scope) {
		$scope.tab = false;
		$scope.show = function(tabValue) {
			$scope.tab = tabValue;
		};
	}]);
