[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# gexode

Primitive XML generator for node.js

## Example

```js
var gexode = require(gexode), doc = gexode.doc, elem = gexode.elem;

var car = doc(elem('car', {wheels: 4}).text('Volvo'));
car.write(out);
```

renders as:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<car wheels='4'>Volvo</car>
```


## Streaming mode

`gexode` can be also used in streaming mode

```js
var gexodeStream = require('gexode').stream;
var xml = gexodeStream(writeableStream);

xml.header();
xml.start('cars');
xml.el('car', {wheels: 4}, 'Volvo');
xml.end();

```

renders as:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<cars>
<car wheels='4'>Volvo</car>
</cars>
```


### API

`stream(out, options)`
- `out` is a writeble stream (network response, file etc.)
- `options` - `{ pretty, selfClosing }`
  if `pretty` is truthy intendations are generate
  if `selfClosing` is truthy empty tags are self closeing `<likeThis/>`

- `stream.header` - generate XML header
- `stream.el(name, attribute, text)`- generate a node with attributes (optional) and text (optional), close the node automatically
- `stream.start(name, attribute)`- like `el` but do not close the node
- `stream.end` - close recently opened node


## License

MIT

[npm-image]: https://img.shields.io/npm/v/gexode
[npm-url]: https://npmjs.org/package/gexode

[build-url]: https://github.com/pirxpilot/gexode/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/workflow/status/pirxpilot/gexode/check

[deps-image]: https://img.shields.io/librariesio/release/npm/gexode
[deps-url]: https://libraries.io/npm/gexode
