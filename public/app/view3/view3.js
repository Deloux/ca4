'use strict';
angular.module('angularApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'app/view3/view3.html',
    controller: 'View3Ctrl'
  });
}])
.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})
.controller('View3Ctrl', function ($scope, $http) {
        $scope.filteredWikis = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 10
            ,$scope.maxSize = 5;

        $scope.$watch("currentPage + wikis", function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
            if($scope.wikis){
                $scope.filteredWikis = $scope.wikis.slice(begin, end);
            }
        });
        $scope.search = function(){
            if($scope.query != ""){
                $http({
                    method: 'GET',
                    url: 'api/findWiki/'+$scope.query
                }).
                    success(function (data, status, headers, config) {
                        $scope.wikis = data;

                    }).
                    error(function (data, status, headers, config) {
                        $scope.error = data;
                    });
            }

        }
});




