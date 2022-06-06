const assert = require('assert');
var stream = require('../lib/stream');

const gexode = require('../lib');
const doc = gexode.doc;
const elem = gexode.elem;
var stream = gexode.stream;

function buffer(s) {
  let self;
  let str = s || '';

  self = {
    write(s) {
      str = str.concat(s);
      return str.length;
    },

    toString() {
      return str;
    }
  };

  return self;
}

module.exports = {
  'simple': function () {
    let a;
    const b = buffer();

    a = elem('klm');
    a.write(stream(b, {
      selfClosing: true
    }));
    assert.equal('<klm/>', b.toString());
  },

  'doc': function () {
    let a;
    const b = buffer();

    a = doc(elem('klm').text('bongo'));
    a.write(b);
    assert.equal('<?xml version="1.0" encoding="utf-8" ?>\n' +
      "<klm>bongo</klm>", b.toString());
  },

  'attrs': function () {
    let a;
    const b = buffer();

    a = elem('klm', {
      name: 'kuku',
      value: 5
    });
    a.write(stream(b, {
      selfClosing: true
    }));

    assert.equal('<klm name="kuku" value="5"/>', b.toString());
  },

  'text': function () {
    let a;
    const b = buffer();

    a = elem('klm', {
      name: 'kuku'
    });
    a.text('bongo bongo');

    a.write(stream(b));

    assert.equal('<klm name="kuku">bongo bongo</klm>', b.toString());
  },

  'children': function () {
    let car;
    const b = buffer();

    car = elem('volvo', {
      type: 'sedan'
    });

    car.add(elem('driver', { name: 'Betty' }));
    car.add(elem('passenger', { age: '17', height: undefined }).text('Adam'));

    car.write(stream(b));

    assert.equal('<volvo type="sedan">' +
      '<driver name="Betty"></driver>' +
      '<passenger age="17">Adam</passenger>' +
      '</volvo>', b.toString());
  },

  'pretty': function () {
    let car;
    const b = buffer();

    car = elem('volvo', {
      type: 'sedan'
    });

    car.add(elem('driver', { name: 'Betty' }));
    car.add(elem('passenger', { age: '17' }).text('Adam'));

    car.write(stream(b, {
      pretty: true,
      selfClosing: true
    }));

    assert.equal('<volvo type="sedan">\n' +
      '  <driver name="Betty"/>\n' +
      '  <passenger age="17">Adam</passenger>\n' +
      '</volvo>\n', b.toString());
  },


  'escape': function () {
    const a = elem('car').text('AT&T 2 > 1 < 3 > 2\n"Tricky\'s"');
    const b = buffer();

    a.write(stream(b));
    assert.equal("<car>AT&amp;T 2 &gt; 1 &lt; 3 &gt; 2\n" +
      "&quot;Tricky&apos;s&quot;</car>", b.toString());
  }
};
