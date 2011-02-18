function elem(name, attrs) {
  var self, my = {
    name: name,
    attrs: attrs || {},
    children: []
  };

  function attr(out, name, value) {
    out.write(' ' + name + "='" + value + "'");
  }

  function attributes(out) {
    var a;

    for (a in my.attrs) {
      if (my.attrs.hasOwnProperty(a)) {
        attr(out, a, my.attrs[a]);
      }
    }
  }

  function start(out) {
    out.write('<' + my.name);
    attributes(out);
    out.write('>');
  }

  function end(out) {
    out.write('</' + my.name + '>');
  }

  function children(out) {
    my.children.forEach(function (child) {
      child.write(out);
    });
  }

  function write(out) {
    start(out);
    children(out);
    if (my.text) {
      out.write(my.text);
    }
    end(out);
  }

  function add(elem) {
    my.children.push(elem);
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

exports.elem = elem;