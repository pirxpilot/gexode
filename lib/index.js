const stream = require('./stream');

function elem(name, attrs = {}) {
  const self = {
    write,
    add,
    text
  };

  const my = {
    name,
    attrs
  };

  function write(out) {
    if (my.children) {
      out.start(my.name, my.attrs, my.text);
      my.children.forEach(child => child.write(out));
      out.end();
    } else {
      out.el(my.name, my.attrs, my.text);
    }
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

  function write(o) {
    const out = stream(o);
    out.header();
    my.root.write(out);
  }

  return {
    write
  };
}

exports.elem = elem;
exports.doc = doc;
exports.stream = stream;
