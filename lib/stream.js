module.exports = stream;

function escape(text) {
  var esc = [
    [/&/g, '&amp;'],
    [/"/g, '&quot;'],
    [/'/g, '&apos;'],
    [/</g, '&lt;'],
    [/>/g, '&gt;']
  ];

  if (typeof text !== 'string') {
    return text.toString();
  }

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

        if (typeof value === 'undefined') {
          continue;
        }
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
    if (!opts.selfClosing || text) {
      stack.push(name);
      out.write('>');
      if (text) {
        out.write(escape(text));
      }
      end(true);
    } else {
      out.write('/>');
      suffix();
    }
  }

  function elIfText(name, text) {
    if (text) {
      el(name, null, text);
    }
  }

  function end(skipPrefix) {
    var name = stack.pop();
    if (!skipPrefix) {
      prefix();
    }
    out.write('</');
    out.write(name);
    out.write('>');
    suffix();
  }

  function header() {
    out.write('<?xml version="1.0" encoding="utf-8" ?>\n');
  }

  return {
    header: header,
    start: start,
    el: el,
    elIfText: elIfText,
    end: end
  };
}
