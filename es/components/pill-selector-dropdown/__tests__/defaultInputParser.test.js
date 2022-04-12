import defaultInputParser from '../defaultInputParser';
describe('components/pill-selector-dropdown/defaultInputParser', function () {
  var options;
  beforeEach(function () {
    options = [{
      value: 'AS',
      displayText: 'American Samoa'
    }, {
      value: 'CN',
      displayText: 'China'
    }, {
      value: 'KR',
      displayText: 'Korea, Republic of'
    }, {
      value: 'JP',
      displayText: 'Japan'
    }];
  });
  test('should replace manual input tokens with matching options when available', function () {
    var inputValue = 'China,japan,no match';
    var mappedOptions = defaultInputParser(inputValue, options, []);
    expect(mappedOptions).toStrictEqual([{
      value: 'CN',
      displayText: 'China'
    }, {
      value: 'JP',
      displayText: 'Japan'
    }, {
      value: 'no match',
      displayText: 'no match'
    }]);
  });
  test('should only map manual input tokens that are an exact, case insensitive match', function () {
    var mappedOptions;
    var inputValue = 'Korea';
    mappedOptions = defaultInputParser(inputValue, options, []);
    expect(mappedOptions).toEqual([{
      value: 'Korea',
      displayText: 'Korea'
    }]);
    inputValue = 'jApAn';
    mappedOptions = defaultInputParser(inputValue, options, []);
    expect(mappedOptions).toStrictEqual([{
      value: 'JP',
      displayText: 'Japan'
    }]);
  });
  test('should map manual input items that have an exact, case insensitive match with option values', function () {
    var inputValue = 'cn,jp';
    var mappedOptions = defaultInputParser(inputValue, options, []);
    expect(mappedOptions).toEqual([{
      value: 'CN',
      displayText: 'China'
    }, {
      value: 'JP',
      displayText: 'Japan'
    }]);
  });
  test('should match equivalent item names without comma', function () {
    var inputValue = 'Korea Republic of';
    var mappedOptions = defaultInputParser(inputValue, options, []);
    expect(mappedOptions).toEqual([{
      value: 'KR',
      displayText: 'Korea, Republic of'
    }]);
  });
  test('should match equivalent item names without whitespace', function () {
    var inputValue = 'americansamoa';
    var mappedOptions = defaultInputParser(inputValue, options, []);
    expect(mappedOptions).toEqual([{
      value: 'AS',
      displayText: 'American Samoa'
    }]);
  });
  test('should filter out duplicate entries', function () {
    var inputValue = 'japan,Japan';
    var mappedOptions = defaultInputParser(inputValue, options, []);
    expect(mappedOptions).toEqual([{
      value: 'JP',
      displayText: 'Japan'
    }]);
  });
  test('should filter out tokens that match previously selected options', function () {
    var inputValue = 'china,japan,american samoa';
    var selectedOptions = [{
      value: 'CN',
      displayText: 'China'
    }, {
      value: 'JP',
      displayText: 'Japan'
    }];
    var mappedOptions = defaultInputParser(inputValue, options, selectedOptions);
    expect(mappedOptions).toEqual([{
      value: 'AS',
      displayText: 'American Samoa'
    }]);
  });
});