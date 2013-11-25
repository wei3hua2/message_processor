angular.module('messageProcessorApp')
.factory('MsgProcessorLogic',[function(){

        var _unprocessedMsg = [{id:'1',type:'bd',name:'Allan',gift:'iphone',processed:false},
            {id:'2',type:'congrat',name:'Ted',birthDate:'01-03-2011',processed:false},
            {id:'3',type:'congrat',name:'Dolly',birthDate:'01-03-2011',processed:false},
            {id:'4',type:'congrat',name:'Maden',birthDate:'01-03-2011',processed:false},
            {id:'5',type:'congrat',name:'Rei',birthDate:'01-03-2011',processed:false}];



        return {
            getUnprocessedList : function(){return _unprocessedMsg;}
        };
}]);