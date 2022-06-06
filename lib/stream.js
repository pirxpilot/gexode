module.exports = stream;

function escape(text) {
  const esc = [
    [/&/g, '&amp;'],
    [/"/g, '&quot;'],
    [/'/g, '&apos;'],
    [/</g, '&lt;'],
    [/>/g, '&gt;']
  ];

  if (typeof text !== 'string') {
    return text.toString();
  }

  return esc.reduce(
    (text, [from, to]) => text.replace(from, to),
    text
  );
}

function stream(out, { pretty, selfClosing } = {}) {

  const stack = [];

  function attributes(attrs) {
    Object.entries(attrs).forEach(([name, value]) => {
      if (typeof value === 'undefined') {
        return;
      }
      if (typeof value === 'string') {
        value = escape(value);
      }
      out.write(` ${name}="${value}"`);
    });
  }

  function prefix() {
    if (!pretty) {
      return;
    }
    let i = stack.length;
    while (i--) {
      out.write('  ');
    }
  }

  function suffix() {
    if (pretty) {
      out.write('\n');
    }
  }

  function start(name, attrs, text) {
    prefix();
    out.write(`<${name}`);
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
    if (!selfClosing || text) {
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
    const name = stack.pop();
    if (!skipPrefix) {
      prefix();
    }
    out.write(`</${name}>`);
    suffix();
  }

  function header() {
    out.write('<?xml version="1.0" encoding="utf-8" ?>\n');
  }

  return {
    header,
    start,
    el,
    elIfText,
    end
  };
}
