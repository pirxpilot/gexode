
var assert = require('assert');
var stream = require('../lib/stream');

var gexode = require('../lib'),
  doc = gexode.doc,
  elem = gexode.elem,
  stream = gexode.stream;

function buffer(s) {
  var self, str = s || '';

  self = {
    write: function (s) {
      str = str.concat(s);
      return str.length;
    },

    toString: function () {
      return str;
    }
  };

  return self;
}

module.exports = {
  'simple': function () {
    var a, b = buffer();

    a = elem('klm');
    a.write(stream(b));
    assert.equal('<klm/>', b.toString());
  },

  'doc': function () {
    var a, b = buffer();

    a = doc(elem('klm').text('bongo'));
    a.write(b);
    assert.equal("<?xml version='1.0' encoding='UTF-8'?>\n" +
      "<klm>bongo</klm>", b.toString());
  },

  'attrs': function () {
    var a, b = buffer();

    a = elem('klm', {
      name: 'kuku',
      value: 5
    });
    a.write(stream(b));

    assert.equal('<klm name="kuku" value="5"/>', b.toString());
  },

  'text': function () {
    var a, b = buffer();

    a = elem('klm', {
      name: 'kuku'
    });
    a.text('bongo bongo');

    a.write(stream(b));

    assert.equal('<klm name="kuku">bongo bongo</klm>', b.toString());
  },

  'children': function () {
    var car, b = buffer();

    car = elem('volvo', {
      type: 'sedan'
    });

    car.add(elem('driver', { name: 'Betty' }));
    car.add(elem('passenger', { age: '17' }).text('Adam'));

    car.write(stream(b));

    assert.equal('<volvo type="sedan">' +
      '<driver name="Betty"/>' +
      '<passenger age="17">Adam</passenger>' +
      '</volvo>', b.toString());
  },

  'escape': function() {
    var a = elem('car').text('AT&T 2 > 1 < 3 > 2\n"Tricky\'s"'),
      b = buffer();

    a.write(stream(b));
    assert.equal("<car>AT&amp;T 2 &gt; 1 &lt; 3 &gt; 2\n" +
      "&quot;Tricky&apos;s&quot;</car>", b.toString());
  }
};
