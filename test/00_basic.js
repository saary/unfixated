var fs = require('fs');
var path = require('path');
var should = require('chai').should();

var UnFixated  = require('../unfixated.js');

describe('Test basic format', function() {
  it('Should produce objects matching the basic fixture objects', function(done) {
    var objects = require(path.join(__dirname, 'fixtures', 'basic.js')).objects;
    var basicStream = fs.createReadStream(path.join(__dirname, 'fixtures', 'basic.txt'));

    var format = {
      first:  5,
      second: 2,
      third: 10,
    };

    var unfixated = new UnFixated(format);

    unfixated.on('data', function(obj) {
      var oobj = objects.shift();
      obj.should.deep.equal(oobj);
    });

    unfixated.on('end', function() {
      done();
    });

    basicStream.pipe(unfixated);
  });
});