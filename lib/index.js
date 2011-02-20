function escape(text) {
  var esc = [
    [/&/g, '&amp;'],
    [/"/g, '&quot;'],
    [/'/g, '&apos;'],
    [/</g, '&lt;'],
    [/>/g, '&gt;']
  ];
  esc.forEach(function (repl) {
    text = text.replace(repl[0], repl[1]);
  });
  return text;
}


function attr(out, name, value) {
  out.write(' ' + name + "='" + value + "'");
}

function elem(name, attrs) {
  var self, my = {
    name: name,
    attrs: attrs || {},
    children: []
  };

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
      out.write(escape(my.text));
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

function doc(root) {
  var self, my = {
    root: root
  };

  function header(out) {
    out.write("<?xml version='1.0' encoding='UTF-8'?>\n");
  }

  function write(out) {
    header(out);
    my.root.write(out);
  }

  self = {
    write: write
  };

  return self;
}

exports.elem = elem;
exports.doc = doc;
