var LineStream = require('byline').LineStream;
var Transform = require('stream').Transform;
var util = require('util');

util.inherits(UnFixated, Transform);

function UnFixated(format, opt) {
  if (!(this instanceof UnFixated)) {
    return new UnFixated(format, opt);
  }

  opt = opt || {};
  opt.writableObjectMode = false;
  opt.readableObjectMode = true;

  this._options = opt;

  Transform.call(this, opt);
  this._format = format;

  var self = this;

  function lineToObject(line) {
    line = line.toString();

    var offset = 0;
    var format = self._format;

    var obj = {};

    Object.keys(format).forEach(function(key) {
      var value = line.substr(offset, format[key]);

      value = value && value.trim();

      if (value) {
        obj[key] = value;
      }

      offset += format[key];
    });
    self.push(obj);
  }

  this.lineStream = new LineStream();

  this.lineStream.on('data', lineToObject);

  this.on('finish', function() {
    self.lineStream.end()
  })

}

UnFixated.prototype._transform = function (data, encoding, callback) {
  var convert = this._options.convert;
  var value = convert? convert(data): data;

  if (Buffer.isBuffer(value)) {
    encoding = 'utf8';
    value = value.toString();
  }
  
  this.lineStream.write(value, encoding);
  return callback();
};

module.exports = UnFixated;

