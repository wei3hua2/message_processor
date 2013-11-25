var mock, notify;



xit('should not alert first two notifications', function() {
    notify('one');
    notify('two');

    expect(mock.alert).not.toHaveBeenCalled();
});