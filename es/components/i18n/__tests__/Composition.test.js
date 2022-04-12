import React from 'react';
import Composition from '../Composition';
describe('components/i18n/Composition', function () {
  test('Compose strings to a string properly', function () {
    var c = new Composition('this is a test');
    expect(c.compose()).toEqual('this is a test');
  });
  test('Compose nulls to a empty string', function () {
    var c = new Composition(null);
    expect(c.compose()).toEqual('');
  });
  test('Compose undefined to an empty string', function () {
    var c = new Composition();
    expect(c.compose()).toEqual('');
  });
  test('Compose booleans to a string properly', function () {
    var c = new Composition(false);
    expect(c.compose()).toEqual('false');
  });
  test('Compose numbers to a string properly', function () {
    var c = new Composition(5.4);
    expect(c.compose()).toEqual('5.4');
  });
  test('Compose React elements with no children to an empty string', function () {
    var el = React.createElement('span', {
      key: 'a'
    });
    var c = new Composition(el); // nothing to translate, so no composed string

    expect(c.compose()).toEqual('');
  });
  test('Compose React elements that only have one child to a simple string', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, 'foo');
    var c = new Composition(el);
    expect(c.compose()).toEqual('foo');
  });
  test('Compose React elements with two string children to a simple string', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, ['foo', ' bar']);
    var c = new Composition(el);
    expect(c.compose()).toEqual('foo bar');
  });
  test('Compose React elements that have subchildren into a coded string', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'b'
    }, 'emergency broadcast system'), '. This is only a test.']);
    var c = new Composition(el);
    expect(c.compose()).toEqual('This is a test of the <c0>emergency broadcast system</c0>. This is only a test.');
  });
  test('Make sure you get the same thing when you compose twice', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'b'
    }, 'emergency broadcast system'), '. This is only a test.']);
    var c = new Composition(el);
    var expected = 'This is a test of the <c0>emergency broadcast system</c0>. This is only a test.';
    expect(c.compose()).toEqual(expected);
    expect(c.compose()).toEqual(expected); // should be the same the second time around too
  });
  test('Compose multiple subchildren into a coded string', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'b'
    }, 'emergency broadcast system'), '. This is ', React.createElement('b', {
      key: 'c'
    }, 'only'), ' a test.']);
    var c = new Composition(el);
    var expected = 'This is a test of the <c0>emergency broadcast system</c0>. This is <c1>only</c1> a test.';
    var actual = c.compose();
    expect(actual).toEqual(expected);
  });
  test('Compose properly with a complex set of nested subchildren to a coded string', function () {
    var el = React.createElement('span', {
      key: 'x'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'y'
    }, ['emergency ', React.createElement('i', {
      key: 'z'
    }, 'broadcast'), ' system']), '. This is only a test.']);
    var c = new Composition(el);
    var expected = 'This is a test of the <c0>emergency <c1>broadcast</c1> system</c0>. This is only a test.';
    var actual = c.compose();
    expect(actual).toEqual(expected);
  });
  test('Compose properly with a complex set of nested subchildren at the beginning of the string to a coded string', function () {
    var el = React.createElement('span', {
      key: 'x'
    }, [React.createElement('b', {
      key: 'y'
    }, ['emergency ', React.createElement('i', {
      key: 'z'
    }, 'broadcast'), ' system']), '. This is only a test.']);
    var c = new Composition(el);
    var expected = '<c0>emergency <c1>broadcast</c1> system</c0>. This is only a test.';
    var actual = c.compose();
    expect(actual).toEqual(expected);
  });
  test('Decompose a React element with a string', function () {
    var c = new Composition('simple string');
    expect(c.decompose('einfache Zeichenfolge')).toEqual('einfache Zeichenfolge');
  });
  test('Decompose a React element with only one child', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, 'simple string');
    var expected = React.createElement('span', {
      key: 'a'
    }, 'einfache Zeichenfolge');
    var c = new Composition(el);
    expect(c.decompose('einfache Zeichenfolge')).toEqual(expected);
  });
  test('Decompose a React element with subchildren', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'b'
    }, 'emergency broadcast system'), '. This is only a test.']);
    var expected = React.createElement('span', {
      key: 'a'
    }, ['Dies ist ein Test des ', React.createElement('b', {
      key: 'b'
    }, 'Notfall-Broadcast-Systems'), '. Dies ist nur ein Test.']);
    var c = new Composition(el);
    expect(c.decompose('Dies ist ein Test des <c0>Notfall-Broadcast-Systems</c0>. Dies ist nur ein Test.')).toEqual(expected);
  });
  test('Decompose with a complex set of children', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'b'
    }, ['emergency ', React.createElement('i', {
      key: 'c'
    }, 'broadcast'), ' system']), '. This is only a test.']);
    var expected = React.createElement('span', {
      key: 'a'
    }, ['Dies ist ein Test des ', React.createElement('b', {
      key: 'b'
    }, ['Notfall-', React.createElement('i', {
      key: 'c'
    }, 'Broadcast'), '-Systems']), '. Dies ist nur ein Test.']);
    var c = new Composition(el);
    expect(c.decompose('Dies ist ein Test des <c0>Notfall-<c1>Broadcast</c1>-Systems</c0>. Dies ist nur ein Test.')).toEqual(expected);
  });
  test('Decompose a React element with subchildren at the beginning of the string', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, [React.createElement('b', {
      key: 'b'
    }, 'emergency broadcast system'), '. This is only a test.']);
    var expected = React.createElement('span', {
      key: 'a'
    }, [React.createElement('b', {
      key: 'b'
    }, 'Notfall-Broadcast-Systems'), '. Dies ist nur ein Test.']);
    var c = new Composition(el);
    expect(c.decompose('<c0>Notfall-Broadcast-Systems</c0>. Dies ist nur ein Test.')).toEqual(expected);
  });
  test('Make sure other properties are preserved while decomposing', function () {
    var el = React.createElement('span', {
      key: 'a',
      foo: 'bar'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'b'
    }, ['emergency ', React.createElement('i', {
      key: 'c',
      asdf: 'fdsa'
    }, 'broadcast'), ' system']), '. This is only a test.']);
    var expected = React.createElement('span', {
      key: 'a',
      foo: 'bar'
    }, ['Dies ist ein Test des ', React.createElement('b', {
      key: 'b'
    }, ['Notfall-', React.createElement('i', {
      key: 'c',
      asdf: 'fdsa'
    }, 'Broadcast'), '-Systems']), '. Dies ist nur ein Test.']);
    var c = new Composition(el);
    expect(c.decompose('Dies ist ein Test des <c0>Notfall-<c1>Broadcast</c1>-Systems</c0>. Dies ist nur ein Test.')).toEqual(expected);
  });
  test('Make sure we can decompose if the translator rearranges components', function () {
    var el = React.createElement('span', {
      key: 'a',
      foo: 'bar'
    }, ['This is ', React.createElement('b', {
      key: 'b'
    }, 'bold'), ' and this text is ', React.createElement('i', {
      key: 'c'
    }, 'italic'), '.']);
    var expected = React.createElement('span', {
      key: 'a',
      foo: 'bar'
    }, ['Dieser Text ist ', React.createElement('i', {
      key: 'c'
    }, 'kursiv'), ' und dieser Text ist ', React.createElement('b', {
      key: 'b'
    }, 'fett'), '.']);
    var c = new Composition(el);
    expect(c.decompose('Dieser Text ist <c1>kursiv</c1> und dieser Text ist <c0>fett</c0>.')).toEqual(expected);
  });
  test('Decompose with added parameter elements', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, ['This is a test of the ', React.createElement('b', {
      key: 'b'
    }, ['emergency ', React.createElement('Param', {
      value: 'broadcast',
      description: 'test',
      key: 'c'
    }), ' system']), '. This is only a test.']);
    var expected = React.createElement('span', {
      key: 'a'
    }, ['Dies ist ein Test des ', React.createElement('b', {
      key: 'b'
    }, ['Notfall-', React.createElement('Param', {
      value: 'broadcast',
      description: 'test',
      key: 'c'
    }), '-Systems']), '. Dies ist nur ein Test.']);
    var c = new Composition(el);
    var actual = c.decompose('Dies ist ein Test des <c0>Notfall-<p0/>-Systems</c0>. Dies ist nur ein Test.');
    expect(actual).toEqual(expected);
  });
  test('Decompose while ensuring that only a minimal string is used', function () {
    var el = React.createElement('span', {
      key: 'a'
    }, [React.createElement('div', {
      key: 'x',
      className: 'asdf'
    }, [React.createElement('div', {
      key: 'y',
      className: 'asdfasdfasdf'
    })]), 'This is a test of the ', React.createElement('b', {
      key: 'b'
    }, ['emergency ', React.createElement('Param', {
      value: 'broadcast',
      description: 'test',
      key: 'c'
    }), ' system']), '. This is only a test.']);
    var expected = React.createElement('span', {
      key: 'a'
    }, [React.createElement('div', {
      key: 'x',
      className: 'asdf'
    }, [React.createElement('div', {
      key: 'y',
      className: 'asdfasdfasdf'
    })]), 'Dies ist ein Test des ', React.createElement('b', {
      key: 'b'
    }, ['Notfall-', React.createElement('Param', {
      value: 'broadcast',
      description: 'test',
      key: 'c'
    }), '-Systems']), '. Dies ist nur ein Test.']);
    var c = new Composition(el);
    var actual = c.decompose('Dies ist ein Test des <c0>Notfall-<p0/>-Systems</c0>. Dies ist nur ein Test.');
    expect(actual).toEqual(expected);
  });
});