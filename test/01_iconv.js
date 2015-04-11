var Iconv  = require('iconv').Iconv;
var fs = require('fs');
var path = require('path');
var should = require('chai').should();

var UnFixated  = require('../unfixated.js');

describe('Test basic format', function() {
  it('Should produce objects matching the basic fixture objects', function(done) {
    var objects = require(path.join(__dirname, 'fixtures', 'iconv.js')).objects;
    var basicStream = fs.createReadStream(path.join(__dirname, 'fixtures', 'iconv.txt'));

    var format = {
      first:  5,
      second: 6,
      third: 2,
      forth: 8,
    };

    var iconv = new Iconv('CP1255', 'UTF-8');
    var opt = {
      convert: iconv.convert.bind(iconv),
    };

    var unfixated = new UnFixated(format, opt);

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