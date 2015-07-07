var ByteSDK = require('../index');

describe('Testing Computer Model: ', function () {
    it('Does a basic ComputerResponse creation', function* (done) {
        var computerResponse = new ByteSDK.ComputerResponse();
        computerResponse.data.should.have.property('objects');

        done();
    });

    it('Does a basic ComputerConfig creation', function* (done) {
        var testName = 'Name';
        var testPlaceholder = 'Placeholder';
        var computerConfig = new ByteSDK.ComputerConfig(testName, testPlaceholder);

        computerConfig.data.should.have.property('args').with.lengthOf(1);
        computerConfig.data.args[0].should.have.property('name').equal(testName);
        computerConfig.data.args[0].should.have.property('type').equal('String');
        computerConfig.data.args[0].should.have.property('placeholder').equal(testPlaceholder);

        done();
    });
});
