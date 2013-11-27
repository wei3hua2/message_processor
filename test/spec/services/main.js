var mock, _msgProcessorLogic;

describe('Service: MsgProcessorLogic', function () {
    beforeEach(function(){
        module('messageProcessorApp');

        inject(function($injector) {
            _msgProcessorLogic = $injector.get('MsgProcessorLogic');
            _msgProcessorLogic.resetAll();
        });
    });

    it('should have 5 unprocessed message & 0 processed msg at the start', function() {
        expect(_msgProcessorLogic.getUnprocessedList().length).toBe(5);
        expect(_msgProcessorLogic.getProcessedList().length).toBe(0);
    });

    it('should expect gift iphone processed', function() {
        _msgProcessorLogic.processGift('12','IPhone 5s',function(){});

        expect(_msgProcessorLogic.getUnprocessedList().length).toBe(4);
        expect(_msgProcessorLogic.getProcessedList().length).toBe(1);
        expect(_msgProcessorLogic.getProcessedList()[0].gift).toBe('IPhone 5s');
    });

    it('should expect congrat baby Maurita processed', function() {
        _msgProcessorLogic.processCongrat('22','21-01-2013','Maurita',function(){});

        expect(_msgProcessorLogic.getUnprocessedList().length).toBe(4);
        expect(_msgProcessorLogic.getProcessedList().length).toBe(1);
    });

});