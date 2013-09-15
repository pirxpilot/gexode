[![Build Status](https://secure.travis-ci.org/pirxpilot/gexode.png)](http://travis-ci.org/pirxpilot/gexode)
[![Dependency Status](https://david-dm.org/pirxpilot/gexode.png)](https://david-dm.org/pirxpilot/gexode)
[![NPM version](https://badge.fury.io/js/gexode.png)](http://badge.fury.io/js/gexode)

# gexode

Primitive XML generator for node.js

## Example

```javascript
var gexode = require(gexode), doc = gexode.doc, elem = gexode.elem;

var car = doc(elem('car', {wheels: 4}).text('Volvo'));
car.write(out);
```

renders as:

```
<?xml version='1.0' encoding='UTF-8'?>
<car wheels='4'>Volvo</car>
```

## License

MIT
