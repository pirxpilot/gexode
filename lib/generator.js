export default generator;

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

  return esc.reduce((text, [from, to]) => text.replace(from, to), text);
}

function generator({ pretty, selfClosing } = {}) {
  const stack = [];
  const fmt = pretty
    ? { prefix, suffix }
    : { prefix: () => '', suffix: () => '' };

  function prefix() {
    return '  '.repeat(stack.length);
  }

  function suffix() {
    return '\n';
  }

  function attributes(attrs = {}) {
    return Object.entries(attrs)
      .filter(([, value]) => value != null)
      .map(([name, value]) => ` ${name}="${escape(value)}"`)
      .join('');
  }

  function* start(name, attrs, text) {
    yield `${fmt.prefix()}<${name}${attributes(attrs)}>${fmt.suffix()}`;
    if (text) {
      yield escape(text);
    }
    stack.push(name);
  }

  function* el(name, attrs, text) {
    yield `${fmt.prefix()}<${name}${attributes(attrs)}`;
    if (!selfClosing || text) {
      stack.push(name);
      yield '>';
      if (text) {
        yield escape(text);
      }
      yield* end(true);
    } else {
      yield `/>${fmt.suffix()}`;
    }
  }

  function* elIfText(name, text) {
    if (text) {
      yield* el(name, null, text);
    }
  }

  function* end(skipPrefix) {
    const name = stack.pop();
    if (!skipPrefix) {
      yield fmt.prefix();
    }
    yield `</${name}>${fmt.suffix()}`;
  }

  function* header() {
    yield '<?xml version="1.0" encoding="utf-8" ?>\n';
  }

  return {
    header,
    start,
    el,
    elIfText,
    end
  };
}
