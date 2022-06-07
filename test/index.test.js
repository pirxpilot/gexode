const assert = require('assert');

const gexode = require('../lib');
const doc = gexode.doc;
const elem = gexode.elem;

module.exports = {
  'simple': function () {
    const a = elem('klm');
    assert.equal('<klm/>', a.toString({ selfClosing: true }));
  },

  'doc': function () {
    const a = doc(elem('klm').text('bongo'));
    assert.equal(
      '<?xml version="1.0" encoding="utf-8" ?>\n' +
      "<klm>bongo</klm>",
      a.toString()
    );
  },

  'attrs': function () {
    const a = elem('klm', {
      name: 'kuku',
      value: 5
    });
    assert.equal(
      '<klm name="kuku" value="5"/>',
      a.toString({ selfClosing: true })
    );
  },

  'text': function () {
    const a = elem('klm', {
      name: 'kuku'
    });
    a.text('bongo bongo');
    assert.equal('<klm name="kuku">bongo bongo</klm>', a.toString());
  },

  'children': function () {

    const car = elem('volvo', {
      type: 'sedan'
    });

    car.add(elem('driver', { name: 'Betty' }));
    car.add(elem('passenger', { age: '17', height: undefined }).text('Adam'));

    assert.equal('<volvo type="sedan">' +
      '<driver name="Betty"></driver>' +
      '<passenger age="17">Adam</passenger>' +
      '</volvo>', car.toString());
  },

  'pretty': function () {
    const car = elem('volvo', {
      type: 'sedan'
    });

    car.add(elem('driver', { name: 'Betty' }));
    car.add(elem('passenger', { age: '17' }).text('Adam'));

    const b = car.toString({
      pretty: true,
      selfClosing: true
    });

    assert.equal('<volvo type="sedan">\n' +
      '  <driver name="Betty"/>\n' +
      '  <passenger age="17">Adam</passenger>\n' +
      '</volvo>\n', b);
  },


  'escape': function () {
    const a = elem('car').text('AT&T 2 > 1 < 3 > 2\n"Tricky\'s"');

    assert.equal("<car>AT&amp;T 2 &gt; 1 &lt; 3 &gt; 2\n" +
      "&quot;Tricky&apos;s&quot;</car>", a.toString());
  }
};
