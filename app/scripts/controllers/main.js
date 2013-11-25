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
    .controller('AlertCtrl',['$scope','$rootScope',function($scope,$rootScope){

        $scope.alert = undefined;
        $scope.clearAlert = function(){
            $scope.alert = undefined;
        }

        $scope.$on('alert:showMsg',function(evt,type,message){
            $scope.alert = {type:type,msg:message};
        });
    }
    ])
    .controller('ProcessMsgCtrl',['$scope','$rootScope','MsgProcessorLogic','MockData',function($scope,$rootScope,processorSvc,mockdata){

        var _resetData = function(){
            $scope.unprocessedMsg = processorSvc.getUnprocessedList();
            $scope.selected = undefined;

            $scope.congrat = {
                babyName:null,
                dob:null,
                babyNameList:mockdata.babyNameList
            };

            $scope.bd = {
                gift:null,
                giftList:mockdata.giftList
            }
        }
        _resetData();

        $scope.setSelected = function(id){
            $scope.selected = _.find($scope.unprocessedMsg,function(msg){return msg.id==id});
        }



        $scope.approve = function(){
            if($scope.selected){
                if($scope.selected.type=='bd'){
                    processorSvc.processGift($scope.selected.id,$scope.bd.gift,function(errorType,msg){
                        $rootScope.$broadcast('alert:showMsg',errorType,msg);

                        _resetData();
                    });
                }
                else if($scope.selected.type=='congrat'){
                    processorSvc.processCongrat($scope.selected.id,$scope.congrat.babyName,$scope.congrat.dob);
                }
            }
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
    }]);
