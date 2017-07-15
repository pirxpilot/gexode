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

function stream(out) {

  var stack = [];

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

  function start(name, attrs, text) {
    out.write('<');
    out.write(name);
    attributes(attrs);
    out.write('>');
    if (text) {
      out.write(escape(text));
    }
    stack.push(name);
  }

  function el(name, attrs, text) {
    out.write('<');
    out.write(name);
    attributes(attrs);
    if (text) {
      stack.push(name);
      out.write('>');
      out.write(escape(text));
      end();
    } else {
      out.write('/>');
    }
  }

  function end() {
    out.write('</');
    out.write(stack.pop());
    out.write('>');
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
