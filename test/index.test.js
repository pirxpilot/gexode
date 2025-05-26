const test = require('node:test');

const { doc, elem } = require('..');

test('simple', t => {
  const a = elem('klm');
  t.assert.equal('<klm/>', a.toString({ selfClosing: true }));
});

test('doc', t => {
  const a = doc(elem('klm').text('bongo'));
  t.assert.equal(
    '<?xml version="1.0" encoding="utf-8" ?>\n' + '<klm>bongo</klm>',
    a.toString()
  );
});

test('attrs', t => {
  const a = elem('klm', {
    name: 'kuku',
    value: 5
  });
  t.assert.equal(
    '<klm name="kuku" value="5"/>',
    a.toString({ selfClosing: true })
  );
});

test('text', t => {
  const a = elem('klm', {
    name: 'kuku'
  });
  a.text('bongo bongo');
  t.assert.equal('<klm name="kuku">bongo bongo</klm>', a.toString());
});

test('children', t => {
  const car = elem('volvo', {
    type: 'sedan'
  });

  car.add(elem('driver', { name: 'Betty' }));
  car.add(elem('passenger', { age: '17', height: undefined }).text('Adam'));

  t.assert.equal(
    '<volvo type="sedan">' +
      '<driver name="Betty"></driver>' +
      '<passenger age="17">Adam</passenger>' +
      '</volvo>',
    car.toString()
  );
});

test('pretty', t => {
  const car = elem('volvo', {
    type: 'sedan'
  });

  car.add(elem('driver', { name: 'Betty' }));
  car.add(elem('passenger', { age: '17' }).text('Adam'));

  const b = car.toString({
    pretty: true,
    selfClosing: true
  });

  t.assert.equal(
    '<volvo type="sedan">\n' +
      '  <driver name="Betty"/>\n' +
      '  <passenger age="17">Adam</passenger>\n' +
      '</volvo>\n',
    b
  );
});

test('escape', t => {
  const a = elem('car').text('AT&T 2 > 1 < 3 > 2\n"Tricky\'s"');

  t.assert.equal(
    '<car>AT&amp;T 2 &gt; 1 &lt; 3 &gt; 2\n' +
      '&quot;Tricky&apos;s&quot;</car>',
    a.toString()
  );
});
