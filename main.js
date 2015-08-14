angular.module('UNESCODistributionReporting', [])
	.controller('mainCtrl', ['$scope', function($scope) {
		$scope.tab = false;
		$scope.btn_name = 'View Donor Chart';
		$scope.show = function() {
			$scope.tab = !$scope.tab;
			if($scope.tab)
				$scope.btn_name = 'Hide Donor Chart';
			else
				$scope.btn_name = 'View Donor Chart';
		};
	}]);
