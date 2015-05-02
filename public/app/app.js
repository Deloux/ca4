'use strict';

// Declare app level module which depends on views, and components
angular.module('angularApp', [
  'ngRoute',
  'angularApp.controllers',
  'angularApp.directives',
  'angularApp.services',
  'angularApp.factories',
  'angularApp.filters',
  'angularApp.view1',
  'angularApp.view2',
  'angularApp.view3',
    'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);