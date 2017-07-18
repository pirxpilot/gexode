var stream = require('./stream');

function elem(name, attrs) {
  var self, my = {
    name: name,
    attrs: attrs || {}
  };

  function write(out) {
    if (my.children) {
      out.start(my.name, my.attrs, my.text);
      my.children.forEach(function (child) {
        child.write(out);
      });
      out.end();
    } else {
      out.el(my.name, my.attrs, my.text);
    }
  }

  function add(elem) {
    if (!my.children) {
      my.children = [ elem ];
    } else {
      my.children.push(elem);
    }
    return self;
  }

  function text(t) {
    my.text = t;
    return self;
  }

  self = {
    write: write,
    add: add,
    text: text
  };

  return self;
}

function doc(root) {
  var self, my = {
    root: root
  };

  function write(o) {
    var out = stream(o);
    out.header();
    my.root.write(out);
  }

  self = {
    write: write
  };

  return self;
}

exports.elem = elem;
exports.doc = doc;
exports.stream = stream;
