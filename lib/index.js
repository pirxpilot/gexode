const generator = require('./generator');

module.exports = {
  elem,
  doc,
  generator
};

function elem(name, attrs = {}) {
  const self = {
    strings,
    toString,
    add,
    text
  };

  const my = {
    name,
    attrs
  };

  function* strings(gen) {
    if (my.children) {
      yield* gen.start(my.name, my.attrs, my.text);
      for (const child of my.children) {
        yield* child.strings(gen);
      }
      yield* gen.end();
    } else {
      yield* gen.el(my.name, my.attrs, my.text);
    }
  }

  function toString(opts) {
    const gen = generator(opts);
    return Array.from(strings(gen)).join('');
  }

  function add(elem) {
    if (!my.children) {
      my.children = [elem];
    } else {
      my.children.push(elem);
    }
    return self;
  }

  function text(t) {
    my.text = t;
    return self;
  }

  return self;
}

function doc(root) {
  const my = {
    root
  };

  function* strings(opts) {
    const gen = generator(opts);
    yield* gen.header();
    yield* my.root.strings(gen);
  }

  function toString(opts) {
    return Array.from(strings(opts)).join('');
  }

  return {
    strings,
    toString
  };
}
