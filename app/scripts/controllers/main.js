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
        $scope.unprocessedMsg = [{id:'1',type:'bd',name:'Allan',gift:'iphone',processed:false},
            {id:'2',type:'congrat',name:'Ted',birthDate:'01-03-2011',processed:false},
            {id:'3',type:'congrat',name:'Dolly',birthDate:'01-03-2011',processed:false},
            {id:'4',type:'congrat',name:'Maden',birthDate:'01-03-2011',processed:false},
            {id:'5',type:'congrat',name:'Rei',birthDate:'01-03-2011',processed:false}];

        $scope.selected = undefined;

        $scope.setSelected = function(id){
            $scope.selected = _.find($scope.unprocessedMsg,function(msg){return msg.id==id});
        }
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
            link: function(scope, element, attrs){
//                element.find('.open-btn').click(function(){
//                    console.log(scope.item);
//                    element.find('.modal').modal();
//                });
            }
        }
  }]);
