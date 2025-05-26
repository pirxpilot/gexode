[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# gexode

Primitive XML generator for node.js

## Example

```js
const { doc, elem } = require(gexode);
const car = doc(elem('car', {wheels: 4}).text('Volvo'));
car.toString();
```

renders as:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<car wheels='4'>Volvo</car>
```


## Generator mode

`gexode` can also be used as a generator

```js
import { generator } from 'gexode';

const { header, start, el, end } = generator({ pretty: true });

function* cars() {
  yield* header();
  yield* start('cars');
  yield* el('car', { wheels: 4 }, 'Volvo');
  yield* end();
}

Array.from(cars()).join('');

```

renders as:

```xml
<?xml version='1.0' encoding='UTF-8'?>
<cars>
  <car wheels='4'>Volvo</car>
</cars>
```


### API

`generator(options)`
- `options` - `{ pretty, selfClosing }`
  if `pretty` is truthy intendations are generate
  if `selfClosing` is truthy empty tags are self closeing `<likeThis/>`

- `header` - generate XML header
- `el(name, attribute, text)`- generate a node with attributes (optional) and text (optional), close the node automatically
- `start(name, attribute)`- like `el` but do not close the node
- `end` - close recently opened node


## License

MIT

[npm-image]: https://img.shields.io/npm/v/gexode
[npm-url]: https://npmjs.org/package/gexode

[build-url]: https://github.com/pirxpilot/gexode/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/gexode/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/gexode
[deps-url]: https://libraries.io/npm/gexode
