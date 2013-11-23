'use strict';

angular.module('messageProcessorApp', ['ngCookies'])
  .config(function ($routeProvider,$httpProvider) {

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
      .when('/signin',{
        templateUrl: 'views/signin.html',
        controller: 'SignInCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

//      $httpProvider.responseInterceptors.push('httpInterceptor');
  })
    .run(function($rootScope,$location){
        $rootScope.$on('$routeChangeStart',function(event, next, current) {
            if($rootScope.loggedUser==null){
                if ( next.templateUrl == "views/signin.html" ) {
                    // already going to #login, no redirect needed
                    console.log('already sign in page')
                } else {
                    console.log('@ '+next.templateUrl+' going to signin');
                    $location.path("/signin");
                }
            }
        });
    });
//    .factory('httpInterceptor',['$q',function($q){
//        return function(promise){
//            return promise.then(function(resp){
//                return resp;
//            },function(response){
//                if (response.status === 401) {
//                    $rootScope.$broadcast('event:loginRequired');
//                } else if (response.status >= 400 && response.status < 500) {
//                    ErrorService.setError('Server was unable to find' +
//                        ' what you were looking for... Sorry!!');
//                }
//                return $q.reject(response);
//            });
//        }
//    }]);
