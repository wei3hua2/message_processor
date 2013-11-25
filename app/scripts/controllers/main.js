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

        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            yearRange: '2000:-0'
        };

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
            if($scope.selected)
                $scope.selected.titleMsg = $scope.selected.type=='bd' ?
                    'Approve '+$scope.selected.name+' Birthday Wish' : 'Approve '+$scope.selected.name+'\'s Baby Birthday';
        }

        $scope.approve = function(){
            if($scope.selected){
                if($scope.selected.type=='bd'){
                    processorSvc.processGift($scope.selected.id,$scope.bd.gift,function(msgType,msg){
                        $rootScope.$broadcast('alert:showMsg',msgType,msg);
                        _resetData();
                    });
                }
                else if($scope.selected.type=='congrat'){
                    processorSvc.processCongrat($scope.selected.id,$scope.congrat.babyName,$scope.congrat.dob,function(msgType,msg){
                        $rootScope.$broadcast('alert:showMsg',msgType,msg);
                        _resetData();
                    });
                }
            }
        }

        $scope.isDisabledApproval = function(){
            if(!$scope.selected){}
            else if($scope.selected.type=='bd'){
                if($scope.bd.gift)return false;
            }else if($scope.selected.type=='congrat'){
                if($scope.congrat.babyName && $scope.congrat.dob)return false;
            }

            return true;
        }
    }])
    .controller('ProcessedMsgCtrl',['$scope','$filter','ngTableParams','MsgProcessorLogic',function($scope,$filter,ngTableParams,processorSvc){

        var data = processorSvc.getProcessedList();

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {
                dateProcessed: 'desc'
            }
        }, {
            total: data.length,
            getData: function($defer, params) {
                var orderedData = params.sorting() ?
                    $filter('orderBy')(data, params.orderBy()) :
                    data;

                console.log('orderedData...');
                console.log(orderedData);

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

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
