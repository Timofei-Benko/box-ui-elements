function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import Address from '@hapi/address';
import tldsHapi from '@hapi/address/lib/tlds';

function hostnameValidator(value) {
  // @see https://github.com/hapijs/joi/blame/3516cf0b995c9fe415634c4612c0ac2f8792f0b4/lib/types/string/index.js#L530
  var regex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
  return regex.test(value);
}

function ipv4AddressValidator(value) {
  // @see https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  var regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(value);
}

function domainNameValidator(value) {
  return Address.domain.isValid(value);
} // @sideway/address ^4 has exhaustive TLDs, but upgrading requires a TextEncoder polyfill (such as fast-text-encoder) for IE11 support.
// We can freely upgrade and remove manual TLD supplementation after IE11 EOL.
// Diff of '@hapi/address/lib/tlds' and:
// https://data.iana.org/TLD/tlds-alpha-by-domain.txt
// Version 2022020100, Last Updated Tue Feb  1 07:07:01 2022 UTC,


var tldSupplements = ['AMAZON', 'CPA', 'LLP', 'MUSIC', 'SPA', 'XN--4DBRK0CE', 'XN--CCKWCXETD', 'XN--JLQ480N2RG', 'XN--MGBCPQ6GPA1A', 'XN--Q7CE6A', 'ZW'];

var emailValidator = function emailValidator(value) {
  return Address.email.isValid(value, {
    tlds: {
      allow: new Set([].concat(_toConsumableArray(tldsHapi), _toConsumableArray(tldSupplements.map(function (tld) {
        return tld.toLowerCase();
      }))))
    }
  });
};

export { domainNameValidator, emailValidator, hostnameValidator, ipv4AddressValidator };
//# sourceMappingURL=validators.js.map