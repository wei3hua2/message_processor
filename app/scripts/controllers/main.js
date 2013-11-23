'use strict';

angular.module('messageProcessorApp')
  .controller('MainCtrl', ['$scope',function ($scope) {
        $scope.messages = [
            {type:'bd',gift:'iphone',processed:false},
            {type:'congrat',babyName:'Ted',birthDate:'01-03-2011',processed:false}
        ];
  }])
    .controller('MenuCtrl',['$scope','$cookieStore','$route','$rootScope',function($scope,$cookieStore,$route,$rootScope){
        $scope.signout = function(){
            $cookieStore.remove('loggeduser');
            $rootScope.loggeduser = null;
            $route.reload();
        }
    }
    ])
    .controller('ProcessMsgCtrl',['$scope',function($scope){
        $scope.unprocessedMsg = [{id:'1',type:'bd',gift:'iphone',processed:false},
            {id:'2',type:'congrat',babyName:'Ted',birthDate:'01-03-2011',processed:false}];
    }])
    .controller('ProcessedMsgCtrl',['$scope',function($scope){
        $scope.unprocessedMsg = [{id:'1',type:'bd',gift:'iphone',processed:false},
            {id:'2',type:'congrat',babyName:'Ted',birthDate:'01-03-2011',processed:false}];
    }])
    .controller('SignInCtrl',['$scope','$cookieStore','$route','$rootScope',function($scope,$cookieStore,$route,$rootScope){
        $scope.email = "";
        $scope.password = "";

        $scope.signin = function(){
            $cookieStore.put('loggeduser',{email:$scope.email});
            $rootScope.loggeduser = {email:$scope.email};
            $route.reload();
        }
    }])
  .directive('displayItemList',[function(){
        return {
            templateUrl: 'views/directive/itemList.html',
            restrict:'A',
            scope:{
                item:'='
            },
            link: function(scope, element, attrs){
//                element.find('.open-btn').click(function(){
//                    console.log(scope.item);
//                    element.find('.modal').modal();
//                });
            }
        }
  }]);
