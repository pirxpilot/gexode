
var assert = require('assert'),
  gexode = require('../lib'),
  doc = gexode.doc,
  elem = gexode.elem;

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
    a.write(b);
    assert.equal('<klm></klm>', b.toString());
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
    a.write(b);

    assert.equal("<klm name='kuku' value='5'></klm>", b.toString());
  },

  'text': function () {
    var a, b = buffer();

    a = elem('klm', {
      name: 'kuku'
    });
    a.text('bongo bongo');

    a.write(b);

    assert.equal("<klm name='kuku'>bongo bongo</klm>", b.toString());
  },

  'children': function () {
    var car, b = buffer();

    car = elem('volvo', {
      type: 'sedan'
    });

    car.add(elem('driver', { name: 'Betty' }));
    car.add(elem('passanger', { age: '17' }).text('Adam'));

    car.write(b);

    assert.equal("<volvo type='sedan'>" +
      "<driver name='Betty'></driver>" +
      "<passanger age='17'>Adam</passanger>" +
      "</volvo>", b.toString());
  }
};
