import hexToBase64 from '../base64';
describe('util/base64', function () {
  test('should convert hex to Base64 correctly', function () {
    var str = '12AB34';
    var expectedB64 = 'Eqs0';
    expect(hexToBase64(str)).toBe(expectedB64);
  });
});