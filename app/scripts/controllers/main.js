'use strict';

angular.module('messageProcessorApp')
  .controller('MainCtrl', function ($scope) {

        $scope.messages = [
            {type:'bd',gift:'iphone',processed:false},
            {type:'congrat',babyName:'Ted',birthDate:'01-03-2011',processed:false}
        ];
  });
