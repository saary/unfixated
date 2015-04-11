# unfixated
Stream fixed width files into objects

## Install
`npm install unfixated`

## How?

```javascript
var Iconv  = require('iconv').Iconv;
var fs = require('fs');
var UnFixated  = require('unfixated');

var stream = fs.createReadStream(path.join(__dirname, 'fixedWidth.txt'));

var format = {
  firstName: 30,
  lastName:  30,
  phone:     15,
  address:  100,
};

// set conversion function
var iconv = new Iconv('CP1255', 'UTF-8');
var opt = {
  convert: iconv.convert.bind(iconv),
};

var unfixated = new UnFixated(format, opt);

unfixated.on('data', function(obj) {
  console.log(obj);
});

stream.pipe(unfixated);
```

### License
MIT
