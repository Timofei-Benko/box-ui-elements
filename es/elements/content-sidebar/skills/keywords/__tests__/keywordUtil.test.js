import getPills from '../keywordUtils';
describe('elements/content-sidebar/keywordUtils/getPills', function () {
  test('should return correct pills for entries', function () {
    expect(getPills([{
      type: 'text',
      text: 'foo'
    }, {
      type: 'text',
      text: 'bar'
    }])).toEqual([{
      value: 0,
      displayText: 'foo'
    }, {
      value: 1,
      displayText: 'bar'
    }]);
  });
});