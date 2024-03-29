angular.module('messageProcessorApp')
.value('MockData',{
       msgProcessor : {
           unprocessedMsg:[
               {id:'11',type:'bd',name:'Allan',gift:''},
               {id:'21',type:'congrat',name:'Ted',birthDate:'',babyName:''},
               {id:'12',type:'bd',name:'Tony',gift:''},
               {id:'22',type:'congrat',name:'Dolly',birthDate:'',babyName:''},
               {id:'24',type:'congrat',name:'Rei',birthDate:'',babyName:''}],
           processedMsg : []
       },
        babyNameList : ['Maurita','Terri','Rhea','Beatriz','Nadine','Johna','Young','Alanna','Brandee','Minh','Shamika','Merlin','Melody','Luz','Brook','Tegan','Jeff','Retta','Stephen','Jayson','Virgen','Thi','Melinda','Muoi','Asia','Hugo','Bradford','Jeffery','Toney','Keitha','Lavinia','Patty','Fairy','Narcisa','Karima','Charla','Rosalia','Letha','Jamee','Eufemia','Lisbeth','Lindsy','Marine','Kerri','Arnita','Alexia','Jordon','Etsuko','Alisa','Stormy','Latisha','Kory','Tambra','Eleonora','Jaimee','Darla','Berry','Krystin','Verlene','Rufina','Kathyrn','Bradly','Sunni','Arnoldo','Garfield','Aubrey','Na','Leo','Caitlyn','Jane','Domingo','Emerald','Regan','Chung','Eveline','Tameka','Alison','Ralph','Dung','Kylie','Darcie','Kortney','Zena','Dylan','Thea','Samella','Chuck','Danica','Wayne','Gregorio','Isabell','Layla','Bruce','Renato','Jolyn','Ima','Anneliese','Debi','Crista'],
        giftList : ["IPhone 5s","Harry Potter and the Philosopher's Stone Book","Nespresso","Amazon Kindle","Toy Gun","Blackberry B10","Xperia Tablet Z","Lego Character","Sony Playstation PS3","Nintendo DS"],
        giftToImgMapper : function(gift){
            var _img = "img/gift/empty_gift.png";
            switch(gift){
                case "IPhone 5s":_img = "img/gift/iphone5s.png";break;
                case "Harry Potter and the Philosopher's Stone Book":_img = "img/gift/harry_potter.png";break;
                case "Nespresso":_img = "img/gift/nespresso.png";break;
                case "Amazon Kindle":_img = "img/gift/amazon_kindle.png";break;
                case "Toy Gun":_img = "img/gift/toygun.png";break;
                case "Blackberry B10":_img = "img/gift/blackberry-B10.png";break;
                case "Xperia Tablet Z":_img = "img/gift/xperia-tablet-z-black.png";break;
                case "Lego Character":_img = "img/gift/lego_character.png";break;
                case "Sony Playstation PS3":_img = "img/gift/ps3.png";break;
                case "Nintendo DS":_img = "img/gift/Nintendo_DS.png";break;
            }

            return _img;
        }
})
.factory('MsgProcessorLogic',['MockData',function(mockData){
        var _unprocessedMsg = mockData.msgProcessor.unprocessedMsg;
        var _processedMsg = mockData.msgProcessor.processedMsg;

        return {
            getUnprocessedList : function(){return _unprocessedMsg;},
            getProcessedList : function(){return _processedMsg;},
            processGift : function(id,giftName,cb){
                var _msg = _.find(_unprocessedMsg,function(msg){
                    return id==msg.id && 'bd'==msg.type;
                });

                if(!_msg){
                    cb('danger',"item id not found")
                }else if(!_.contains(mockData.giftList,giftName)){
                    cb('danger','gift not selected');
                }else{
                    _unprocessedMsg = _.reject(_unprocessedMsg,function(msg){return id==msg.id && 'bd'==msg.type;});

                    _msg.gift = giftName;
                    _msg.dateProcessed = new Date();
                    _msg.msg = 'Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: '+giftName+'. Enjoy';
                    _processedMsg.push(_msg);

                    cb('success','Gift '+giftName+' processed');
                }

            },
            processCongrat : function(id, dob, babyName,cb){
                var _msg = _.find(_unprocessedMsg,function(msg){
                    return id==msg.id && 'congrat'==msg.type;
                });

                _unprocessedMsg = _.reject(_unprocessedMsg,function(msg){return id==msg.id && 'congrat'==msg.type;});

                _msg.birthDate = dob;
                _msg.babyName = babyName;
                _msg.dateProcessed = new Date();
                _msg.msg = 'Whooa well done and congratulations on the birth of '+babyName+' on '+dob+'.';

                _processedMsg.push(_msg);

                cb('success','Congratulation message for '+_msg.name+' processed');
            },
            resetAll : function(){
                _unprocessedMsg = mockData.msgProcessor.unprocessedMsg;
                _processedMsg = [];
            }

        };
}]);