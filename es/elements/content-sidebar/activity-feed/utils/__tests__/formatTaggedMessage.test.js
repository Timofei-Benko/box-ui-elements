import formatTaggedMessage from '../formatTaggedMessage';
describe('elements/content-sidebar/ActivityFeed/utils/formatTaggedMessage', function () {
  test('should return correct result when shouldReturnString is true', function () {
    var actualResult = formatTaggedMessage('test @[3203255873:test user]', 123, true);
    var expectedResult = 'test @test user';
    expect(actualResult).toEqual(expectedResult);
  });
});