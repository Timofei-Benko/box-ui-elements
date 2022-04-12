import openUrlInsideIframe from '../iframe';
describe('openUrlInsideIframe', function () {
  test('should create new iframe', function () {
    var url = 'http://box.com/foobar';
    var firstIframe = openUrlInsideIframe(url);
    expect(firstIframe).toEqual(document.querySelector('#boxdownloadiframe'));
    expect(firstIframe.src).toEqual(url);
    var url2 = 'http://box.com/foobar2';
    var secondIframe = openUrlInsideIframe(url2);
    expect(secondIframe).toEqual(document.querySelector('#boxdownloadiframe'));
    expect(secondIframe.src).toEqual(url2);
    expect(secondIframe).toEqual(firstIframe);
  });
});