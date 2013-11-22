'use strict';

angular.module('messageProcessorApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/process', {
        templateUrl: 'views/process_msg.html',
        controller: 'ProcessMsgCtrl'
      })
      .when('/processed', {
        templateUrl: 'views/processed_msg.html',
        controller: 'ProcessedMsgCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
