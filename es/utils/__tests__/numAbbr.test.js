/**
 * load locale data manually that is not the current locale so that
 * we can use it for unit testing
 */
import germanLocaleData from '@box/cldr-data/locale-data/de-DE';
import russianLocaleData from '@box/cldr-data/locale-data/ru-RU';
import japaneseLocaleData from '@box/cldr-data/locale-data/ja-JP';
import { UnifiedNumberFormat } from '@formatjs/intl-unified-numberformat';
import numAbbr, { Lengths } from '../numAbbr';
var germanNumbersData = germanLocaleData.numbers;
var russianNumbersData = russianLocaleData.numbers;
var japaneseNumbersData = japaneseLocaleData.numbers;
var node = process.versions.node;

if (!node || Number(node.replace(/\..*/g, '')) < 12) {
  // need to polyfill the number formatter in Intl.NumberFormat, because it
  // doesn't work properly on versions of node before 12

  /* eslint-disable global-require */

  /* eslint-disable no-underscore-dangle */

  /* eslint-disable @typescript-eslint/no-var-requires */
  require('@formatjs/intl-unified-numberformat/polyfill');

  if (typeof UnifiedNumberFormat.__addLocaleData === 'function') {
    UnifiedNumberFormat.__addLocaleData(require('@formatjs/intl-unified-numberformat/dist/locale-data/de.json'));

    UnifiedNumberFormat.__addLocaleData(require('@formatjs/intl-unified-numberformat/dist/locale-data/ru.json'));

    UnifiedNumberFormat.__addLocaleData(require('@formatjs/intl-unified-numberformat/dist/locale-data/ja.json'));
  }
  /* eslint-enable global-require */

  /* eslint-enable no-underscore-dangle */

  /* eslint-enable @typescript-eslint/no-var-requires */

}

describe('util/num', function () {
  test('should work in English 1', function () {
    expect(numAbbr(1)).toBe('1');
  });
  test('should work in English 1000', function () {
    expect(numAbbr(1000)).toBe('1K');
  });
  test('should work in English 10000', function () {
    expect(numAbbr(10000)).toBe('10K');
  });
  test('should work in English 100000', function () {
    expect(numAbbr(100000)).toBe('100K');
  });
  test('should work in English 1000000', function () {
    expect(numAbbr(1000000)).toBe('1M');
  });
  test('should work in English 10000000', function () {
    expect(numAbbr(10000000)).toBe('10M');
  });
  test('should work in English 1000000000', function () {
    expect(numAbbr(1000000000)).toBe('1B');
  });
  test('should work in English 1000000000000', function () {
    expect(numAbbr(1000000000000)).toBe('1T');
  });
  test('should work in English larger than max', function () {
    expect(numAbbr(1000000000000000000)).toBe('1,000,000T');
  });
  test('should work in English 1 long', function () {
    expect(numAbbr(1, {
      length: Lengths.long
    })).toBe('1');
  });
  test('should work in English 1000 long', function () {
    expect(numAbbr(1000, {
      length: Lengths.long
    })).toBe('1 thousand');
  });
  test('should work in English 10000 long', function () {
    expect(numAbbr(10000, {
      length: Lengths.long
    })).toBe('10 thousand');
  });
  test('should work in English 100000 long', function () {
    expect(numAbbr(100000, {
      length: Lengths.long
    })).toBe('100 thousand');
  });
  test('should work in English 1000000 long', function () {
    expect(numAbbr(1000000, {
      length: Lengths.long
    })).toBe('1 million');
  });
  test('should work in English 10000000 long', function () {
    expect(numAbbr(10000000, {
      length: Lengths.long
    })).toBe('10 million');
  });
  test('should work in English 1000000000 long', function () {
    expect(numAbbr(1000000000, {
      length: Lengths.long
    })).toBe('1 billion');
  });
  test('should work in English 1000000000000 long', function () {
    expect(numAbbr(1000000000000, {
      length: Lengths.long
    })).toBe('1 trillion');
  });
  test('should work in English larger than max long', function () {
    expect(numAbbr(1000000000000000000, {
      length: Lengths.long
    })).toBe('1,000,000 trillion');
  });
  test('should work in English 12345678 with rounding', function () {
    expect(numAbbr(12345678)).toBe('12M');
  });
  test('should work in English 87654321 with rounding', function () {
    expect(numAbbr(87654321)).toBe('88M');
  });
  test('should work when passing in a number as a string', function () {
    expect(numAbbr('3230000')).toBe('3M');
  });
  test('should not crap out when passing in a string that does not contain a number', function () {
    expect(numAbbr('asdf')).toBe('0');
  });
  test('should not crap out when passing in an empty string', function () {
    expect(numAbbr('')).toBe('0');
  });
  test('should not crap out when passing in a boolean false', function () {
    expect(numAbbr(false)).toBe('0');
  });
  test('should not crap out when passing in a boolean true', function () {
    expect(numAbbr(true)).toBe('1');
  });
  test('should not crap out when passing in a null', function () {
    expect(numAbbr(null)).toBe('0');
  });
  test('should not crap out when passing in undefined', function () {
    expect(numAbbr(undefined)).toBe('0');
  });
  test('should not crap out when passing in an object', function () {
    expect(numAbbr({
      foo: 2,
      bar: 4
    })).toBe('0');
  });
  test('should work when passing in a floating point number', function () {
    expect(numAbbr(24734.45674)).toBe('25K');
  });
  test('should work when passing in a small negative number', function () {
    expect(numAbbr(-24)).toBe('-24');
  });
  test('should abbreviate when passing in a medium negative number', function () {
    expect(numAbbr(-24567)).toBe('-25K');
  });
  test('should abbreviate when passing in a large negative number', function () {
    expect(numAbbr(-24567000000)).toBe('-25B');
  });
  test('should work with 0', function () {
    expect(numAbbr(0)).toBe('0');
  });
  test('should work when passing an array of numbers', function () {
    expect(numAbbr([34534, 333000000, 34])).toStrictEqual(['35K', '333M', '34']);
  });
  test('should work when passing an array of mixed types', function () {
    expect(numAbbr([34534, '333000000', 34])).toStrictEqual(['35K', '333M', '34']);
  });
  test('should work in German 1', function () {
    expect(numAbbr(1, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('1');
  });
  test('should work in German 1000', function () {
    expect(numAbbr(1000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('1.000');
  });
  test('should work in German 10000', function () {
    expect(numAbbr(10000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('10.000');
  });
  test('should work in German 100000', function () {
    expect(numAbbr(100000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('100.000');
  });
  test('should work in German 1000000', function () {
    expect(numAbbr(1000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('1 Mio.');
  });
  test('should work in German 10000000', function () {
    expect(numAbbr(10000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('10 Mio.');
  });
  test('should work in German 1000000000', function () {
    expect(numAbbr(1000000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('1 Mrd.');
  });
  test('should work in German 1000000000000', function () {
    expect(numAbbr(1000000000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('1 Bio.');
  });
  test('should work in German larger than max', function () {
    expect(numAbbr(1000000000000000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE'
    })).toBe('1.000.000 Bio.');
  });
  test('should work in German 1 long', function () {
    expect(numAbbr(1, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('1');
  });
  test('should work in German 1000 long', function () {
    expect(numAbbr(1000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('1 Tausend');
  });
  test('should work in German 10000 long', function () {
    expect(numAbbr(10000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('10 Tausend');
  });
  test('should work in German 100000 long', function () {
    expect(numAbbr(100000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('100 Tausend');
  });
  test('should work in German 1000000 long', function () {
    expect(numAbbr(1000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('1 Million');
  });
  test('should work in German 10000000 long', function () {
    expect(numAbbr(10000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('10 Millionen');
  });
  test('should work in German 1000000000 long', function () {
    expect(numAbbr(1000000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('1 Milliarde');
  });
  test('should work in German 1000000000000 long', function () {
    expect(numAbbr(1000000000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('1 Billion');
  });
  test('should work in German larger than max long', function () {
    expect(numAbbr(1000000000000000000, {
      numbersData: germanNumbersData,
      locale: 'de-DE',
      length: Lengths.long
    })).toBe('1.000.000 Billionen');
  });
  test('should work in Russian 1', function () {
    expect(numAbbr(1, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('1');
  });
  test('should work in Russian 1000', function () {
    expect(numAbbr(1000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('1 тыс.');
  });
  test('should work in Russian 10000', function () {
    expect(numAbbr(10000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('10 тыс.');
  });
  test('should work in Russian 100000', function () {
    expect(numAbbr(100000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('100 тыс.');
  });
  test('should work in Russian 1000000', function () {
    expect(numAbbr(1000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('1 млн');
  });
  test('should work in Russian 10000000', function () {
    expect(numAbbr(10000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('10 млн');
  });
  test('should work in Russian 1000000000', function () {
    expect(numAbbr(1000000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('1 млрд');
  });
  test('should work in Russian 1000000000000', function () {
    expect(numAbbr(1000000000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('1 трлн');
  });
  test('should work in Russian larger than max', function () {
    expect(numAbbr(1000000000000000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU'
    })).toBe('1 000 000 трлн');
  });
  test('should work in Russian 1 long', function () {
    expect(numAbbr(1, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('1');
  });
  test('should work in Russian 1000 long', function () {
    expect(numAbbr(1000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('1 тысяча');
  });
  test('should work in Russian 2000', function () {
    expect(numAbbr(2000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('2 тысячи');
  });
  test('should work in Russian 5000', function () {
    expect(numAbbr(5000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('5 тысяч');
  });
  test('should work in Russian 10000 long', function () {
    expect(numAbbr(10000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('10 тысяч');
  });
  test('should work in Russian 100000 long', function () {
    expect(numAbbr(100000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('100 тысяч');
  });
  test('should work in Russian 1000000 long', function () {
    expect(numAbbr(1000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('1 миллион');
  });
  test('should work in Russian 2000000 long', function () {
    expect(numAbbr(2000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('2 миллиона');
  });
  test('should work in Russian 5000000 long', function () {
    expect(numAbbr(5000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('5 миллионов');
  });
  test('should work in Russian 10000000 long', function () {
    expect(numAbbr(10000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('10 миллионов');
  });
  test('should work in Russian 1000000000 long', function () {
    expect(numAbbr(1000000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('1 миллиард');
  });
  test('should work in Russian 1000000000000 long', function () {
    expect(numAbbr(1000000000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('1 триллион');
  });
  test('should work in Russian larger than max long', function () {
    expect(numAbbr(1000000000000000000, {
      numbersData: russianNumbersData,
      locale: 'ru-RU',
      length: Lengths.long
    })).toBe('1 000 000 триллионов');
  });
  test('should work in Japanese 1', function () {
    expect(numAbbr(1, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('1');
  });
  test('should work in Japanese 1000', function () {
    expect(numAbbr(1000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('1,000');
  });
  test('should work in Japanese 10000', function () {
    expect(numAbbr(10000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('1万');
  });
  test('should work in Japanese 100000', function () {
    expect(numAbbr(100000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('10万');
  });
  test('should work in Japanese 1000000', function () {
    expect(numAbbr(1000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('100万');
  });
  test('should work in Japanese 100000000', function () {
    expect(numAbbr(100000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('1億');
  });
  test('should work in Japanese 1000000000', function () {
    expect(numAbbr(1000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('10億');
  });
  test('should work in Japanese 100000000000', function () {
    expect(numAbbr(100000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('1,000億');
  });
  test('should work in Japanese 1000000000000', function () {
    expect(numAbbr(1000000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('1兆');
  });
  test('should work in Japanese larger than max', function () {
    expect(numAbbr(1000000000000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP'
    })).toBe('1,000,000兆');
  }); // short and long are the same for Japanese

  test('should work in Japanese 1 long', function () {
    expect(numAbbr(1, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('1');
  });
  test('should work in Japanese 1000 long', function () {
    expect(numAbbr(1000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('1,000');
  });
  test('should work in Japanese 10000 long', function () {
    expect(numAbbr(10000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('1万');
  });
  test('should work in Japanese 100000 long', function () {
    expect(numAbbr(100000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('10万');
  });
  test('should work in Japanese 1000000 long', function () {
    expect(numAbbr(1000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('100万');
  });
  test('should work in Japanese 100000000 long', function () {
    expect(numAbbr(100000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('1億');
  });
  test('should work in Japanese 1000000000 long', function () {
    expect(numAbbr(1000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('10億');
  });
  test('should work in Japanese 100000000000 long', function () {
    expect(numAbbr(100000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('1,000億');
  });
  test('should work in Japanese 1000000000000 long', function () {
    expect(numAbbr(1000000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('1兆');
  });
  test('should work in Japanese larger than max long', function () {
    expect(numAbbr(1000000000000000000, {
      numbersData: japaneseNumbersData,
      locale: 'ja-JP',
      length: Lengths.long
    })).toBe('1,000,000兆');
  });
});