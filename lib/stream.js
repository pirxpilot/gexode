module.exports = stream;

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

function stream(out, opts) {

  var stack = [];

  opts = opts || {};

  function attributes(attrs) {
    var name, value;

    for (name in attrs) {
      if (attrs.hasOwnProperty(name)) {
        value = attrs[name];

        if (typeof value === 'string') {
          value = escape(value);
        }

        out.write(' ');
        out.write(name);
        out.write('="');
        out.write(value);
        out.write('"');
      }
    }
  }

  function prefix() {
    if (!opts.pretty) {
      return;
    }
    var i = stack.length;
    while(i--) {
      out.write('  ');
    }
  }

  function suffix() {
    if (!opts.pretty) {
      return;
    }
    out.write('\n');
  }


  function start(name, attrs, text) {
    prefix();
    out.write('<');
    out.write(name);
    attributes(attrs);
    out.write('>');
    suffix();
    if (text) {
      out.write(escape(text));
    }
    stack.push(name);
  }

  function el(name, attrs, text) {
    prefix();
    out.write('<');
    out.write(name);
    attributes(attrs);
    if (text) {
      stack.push(name);
      out.write('>');
      suffix();
      prefix();
      out.write(escape(text));
      suffix();
      end();
    } else {
      out.write('/>');
      suffix();
    }
  }

  function end() {
    var name = stack.pop();
    prefix();
    out.write('</');
    out.write(name);
    out.write('>');
    suffix();
  }

  function header() {
    out.write("<?xml version='1.0' encoding='UTF-8'?>\n");
  }

  return {
    header: header,
    start: start,
    el: el,
    end: end
  };
}
