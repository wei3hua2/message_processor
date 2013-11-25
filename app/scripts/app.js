'use strict';

angular.module('messageProcessorApp', ['ngCookies','ui.date','ui.select2','ngTable'])
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

  })
    .run(function($rootScope,$location,$cookieStore){

        $rootScope.loggeduser = $cookieStore.get('loggeduser');

        $rootScope.$on('$routeChangeStart',function(event, next, current) {

            var loggedUser = $cookieStore.get('loggeduser');

            if(loggedUser==null){
                if ( next.templateUrl == "views/signin.html" ) {}
                else $location.path("/signin");

            }else if(next.templateUrl == "views/signin.html"){
                $location.path('/');
            }
        });
    })
    .filter('mapTypeToName',function(){
        return function(value){
            if(value=='bd')return 'Birthday';
            else if(value=='congrat')return 'Congratulation';
            else return value;
        }
    });

