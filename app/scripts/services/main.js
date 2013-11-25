angular.module('messageProcessorApp')
.value('MockData',{
       msgProcessor : {
           unprocessedMsg:[
               {id:'11',type:'bd',name:'Allan',gift:''},
               {id:'21',type:'congrat',name:'Ted',birthDate:'',babyName:''},
               {id:'12',type:'bd',name:'Tony',gift:''},
               {id:'22',type:'congrat',name:'Dolly',birthDate:'',babyName:''},
               {id:'23',type:'congrat',name:'Maden',birthDate:'',babyName:''},
               {id:'24',type:'congrat',name:'Rei',birthDate:'',babyName:''}],
           processedMsg : []
       }
})
.factory('MsgProcessorLogic',['MockData',function(mockData){
        var _unprocessedMsg = mockData.msgProcessor.unprocessedMsg;
        var _processedMsg = mockData.msgProcessor.processedMsg;

        return {
            getUnprocessedList : function(){return _unprocessedMsg;},
            getProcessedList : function(){return _processedMsg;},
            processGift : function(id,giftName){
                var _msg = _.find(_unprocessedMsg,function(msg){
                    return id==msg.id && 'bd'==msg.type;
                });
                _unprocessedMsg = _.reject(_unprocessedMsg,function(msg){return id==msg.id && 'bd'==msg.type;});

                _msg.gift = giftName;
                _processedMsg.push(_msg);
            },
            processCongrat : function(id, dob, babyName){
                var _msg = _.find(_unprocessedMsg,function(msg){
                    return id==msg.id && 'congrat'==msg.type;
                });
                _unprocessedMsg = _.reject(_unprocessedMsg,function(msg){return id==msg.id && 'congrat'==msg.type;});

                _msg.birthDate = dob;
                _msg.babyName = babyName;
                _processedMsg.push(_msg);
            },
            getAllGift : function(){
                return _.filter(_processMsg,function(msg){return 'bd'==msg.type});
            },
            getAllCongrat : function(){
                return _.filter(_processMsg,function(msg){return 'congrat'==msg.type});
            }

        };
}]);