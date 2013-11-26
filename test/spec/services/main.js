var mock, _msgProcessorLogic;

describe('Service: MsgProcessorLogic', function () {
    beforeEach(function(){
        module('messageProcessorApp');

        inject(function($injector) {
            _msgProcessorLogic = $injector.get('MsgProcessorLogic');
        });
    });

    it('should have 5 unprocessed message & 0 processed msg at the start', function() {
        expect(_msgProcessorLogic.getUnprocessedList().length).toBe(5);
        expect(_msgProcessorLogic.getProcessedList().length).toBe(0);
    });

    it('should expect gift iphone processed', function() {
        expect(_msgProcessorLogic.processGift('12','iphone',function(){}));

        expect(_msgProcessorLogic.getUnprocessedList().length).toBe(4);
        expect(_msgProcessorLogic.getProcessedList().length).toBe(1);
        expect(_msgProcessorLogic.getProcessedList()[0].gift).toBe('iphone');
    });

});