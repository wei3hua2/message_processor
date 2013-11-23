'use strict';

angular.module('messageProcessorApp')
  .controller('MainCtrl', ['$scope',function ($scope) {
        $scope.messages = [
            {type:'bd',gift:'iphone',processed:false},
            {type:'congrat',babyName:'Ted',birthDate:'01-03-2011',processed:false}
        ];
  }])
    .controller('ProcessMsgCtrl',['$scope',function($scope){
        $scope.unprocessedMsg = [{id:'1',type:'bd',gift:'iphone',processed:false},
            {id:'2',type:'congrat',babyName:'Ted',birthDate:'01-03-2011',processed:false}];
    }])
    .controller('ProcessedMsgCtrl',['$scope',function($scope){
        $scope.unprocessedMsg = [{id:'1',type:'bd',gift:'iphone',processed:false},
            {id:'2',type:'congrat',babyName:'Ted',birthDate:'01-03-2011',processed:false}];
    }])
    .controller('SignInCtrl',['$scope','$cookies',function($scope,$cookies){
        $scope.email = "";
        $scope.password = "";

        $scope.signin = function(){
            console.log('signin');
            $cookies.loggeduser = {email:$scope.email};
            console.log($cookies.loggeduser);
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
