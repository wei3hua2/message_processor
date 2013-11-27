'use strict';

describe('Controller', function () {

  // load the controller's module
  beforeEach(module('messageProcessorApp'));


    describe('MenuCtrl',function(){
        var MenuCtrl,$scope;

        beforeEach(inject(function ($controller,$rootScope) {
            $scope = $rootScope.$new();
            MenuCtrl = $controller('MenuCtrl', {
                $scope: $scope
            });
        }));

        it('should have 5 messages for message count',function(){
            expect($scope.msgCount).toBe(5);
        });

        xit('should sign out',function(){
//            $scope.signout();
        });
    });


    describe('ProcessMsgCtrl',function(){
        var ProcessMsgCtrl,$scope,procSvc;

        beforeEach(inject(function ($controller,$rootScope,MsgProcessorLogic) {
            $scope = $rootScope.$new();
            procSvc = MsgProcessorLogic;
            ProcessMsgCtrl = $controller('ProcessMsgCtrl', {
                $scope: $scope
            });
        }));

        it('should initialized model',function(){
            expect($scope.unprocessedMsg).toBeDefined();
            expect($scope.selected).not.toBeDefined();
            expect($scope.bd).toBeDefined();
            expect($scope.congrat).toBeDefined();
        });

        it('should set selected message',function(){
            var _firstItem = procSvc.getUnprocessedList()[0];

            expect($scope.selected).not.toBeDefined();

            $scope.setSelected(_firstItem.id);

            expect($scope.selected.name).toBe(_firstItem.name);
            expect($scope.selected.titleMsg).toBe('Approve '+$scope.selected.name+' Birthday Wish');

        });

        it('should approve selected item as a gift',function(){
            var _firstItem = procSvc.getUnprocessedList()[0];

            procSvc.processGift = jasmine.createSpy();

            expect(procSvc.processGift).not.toHaveBeenCalled();

            $scope.setSelected(_firstItem.id);
            $scope.approve();

            expect(procSvc.processGift).toHaveBeenCalled();
        });
    });


    describe('ProcessedMsgCtrl',function(){
        var ProcessedMsgCtrl,$scope;

        beforeEach(inject(function ($controller,$rootScope) {
            $scope = $rootScope.$new();
            ProcessedMsgCtrl = $controller('ProcessedMsgCtrl', {
                $scope: $scope
            });
        }));

        it('choose Nespresso as selected message',function(){
//            expect($scope.selectedMsg).not.toBeDefined();

//            $scope.viewMessage();
        });
    });


    describe('SignInCtrl',function(){
        var SignInCtrl,$scope, $cStore, $rScope;

        beforeEach(inject(function ($controller,$rootScope,$cookieStore) {
            $scope = $rootScope.$new();
            $cStore = $cookieStore;
            $rScope = $rootScope;
            SignInCtrl = $controller('SignInCtrl', {
                $rootScope: $rootScope,
                $scope: $scope,
                $cookieStore: $cookieStore
            });
        }));

        it('should initialize email & password',function(){
            expect($scope.email).toBe("");
            expect($scope.password).toBe("");
        });

        it('should signin',function(){
            $scope.email="hello@mail.com";
            $scope.password="password";

            expect($cStore.get('loggeduser')).not.toBeDefined();
            expect($rScope.loggeduser).not.toBeDefined();

            $scope.signin();

            expect($cStore.get('loggeduser').email).toBe('hello@mail.com');
            expect($rScope.loggeduser.email).toBe('hello@mail.com');
        });

    });

});
