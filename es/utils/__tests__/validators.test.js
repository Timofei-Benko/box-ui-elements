import { domainNameValidator, emailValidator, hostnameValidator, ipv4AddressValidator } from '../validators';
describe('util/validators', function () {
  describe('domainNameValidator()', function () {
    test.each([['a.com', true], ['www.a.com', true], ['a-1.com', true], ['www.a-1.com', true], ['-a.com', false], ['www.a.com-', false], ['a@b.com', false], ['a.', false], ['1.1.1.1', false], ['1.1.1', false], ['1.1', false], ['a', false]])('domainNameValidator(%s) should return %s', function (domain, expected) {
      expect(domainNameValidator(domain)).toBe(expected);
    });
  });
  describe('hostnameValidator()', function () {
    test.each([['a.com', true], ['www.a.com', true], ['a-1.com', true], ['www.a-1.com', true], ['-a.com', false], ['www.a.com-', false], ['a@b.com', false], ['a.', false], ['1.1.1.1', true], ['1.1.1', true], ['1.1', true], ['a', true]])('hostnameValidator(%s) should return %s', function (hostname, expected) {
      expect(hostnameValidator(hostname)).toBe(expected);
    });
  });
  describe('ipv4AddressValidator()', function () {
    test.each([['a.com', false], ['www.a.com', false], ['a-1.com', false], ['www.a-1.com', false], ['-a.com', false], ['www.a.com-', false], ['a@b.com', false], ['a.', false], ['1.1.1.1', true], ['256.1.1.1', false], ['1.256.1.1', false], ['1.1.256.1', false], ['1.1.1.256', false], ['1.1.1', false], ['1.1', false], ['1.1.', false], ['1.', false], ['a', false]])('ipv4AddressValidator(%s) should return %s', function (address, expected) {
      expect(ipv4AddressValidator(address)).toBe(expected);
    });
  });
  describe('emailValidator()', function () {
    test.each([['a.com', false], ['www.a.com', false], ['a-1.com', false], ['www.a-1.com', false], ['-a.com', false], ['www.a.com-', false], ['a@b.com', true], ['a@b.dfdsfsdffs', false], ['a@b.whatever', false], ['a@b.junk', false], ['a@b.design', true], ['a@b.dog', true], ['a@b.business', true], ['a@b.club', true], ['a@b.life', true], ['a@b.co.com', true], ['a@.com', false], ['a.x@b.com', true], ['a:x@b.com', false], ['a..x@b.com', false], ['@b.com', false], ['a.', false], ['1.1.1.1', false], ['256.1.1.1', false], ['1.256.1.1', false], ['1.1.256.1', false], ['1.1.1.256', false], ['1.1.1', false], ['1.1', false], ['1.1.', false], ['1.', false], ['a', false]])('emailValidator(%s) should return %s', function (email, expected) {
      expect(emailValidator(email)).toBe(expected);
    });
  });
});