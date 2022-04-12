function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import computeSuggestedCollabs from '../computeSuggestedCollabs';
var contacts = [{
  email: 'xxx@example.com',
  id: '1',
  text: 'X User',
  name: 'X User',
  type: 'group',
  value: 'xxx@example.com',
  isExternalUser: false
}, {
  email: 'yyy@example.com',
  id: '2',
  text: 'Y User',
  name: 'Y User',
  type: 'user',
  value: 'yyy@example.com',
  isExternalUser: false
}, {
  email: 'zzz@example.com',
  id: '3',
  text: 'Z User',
  name: 'Z User',
  type: 'user',
  value: 'zzz@example.com',
  isExternalUser: true
}];
var suggestedCollabs = {
  '2': {
    id: '2',
    userScore: 0.5,
    email: 'yyy@example.com',
    name: 'Y User',
    type: 'user',
    isExternalUser: false
  },
  // contacts[1]
  '3': {
    id: '3',
    userScore: 0.1,
    email: 'zzz@example.com',
    name: 'Z User',
    type: 'user',
    isExternalUser: true
  },
  // contacts[2]
  '4': {
    id: '4',
    userScore: 0.2,
    email: 'aaa@example.com',
    name: 'Serious',
    type: 'user',
    isExternalUser: true
  } // not in contacts

};
describe('util/SuggestedCollabs', function () {
  describe('computeSuggestedContacts', function () {
    test('should sort suggestions by highest score', function () {
      var suggested = computeSuggestedCollabs(contacts, suggestedCollabs, 'User')[0];
      expect(suggested).toEqual([suggestedCollabs['2'], suggestedCollabs['3']]);
    });
    test('should return the rest of the contacts not suggested', function () {
      var rest = computeSuggestedCollabs(contacts, suggestedCollabs, 'User')[1];
      expect(rest).toEqual([contacts[0]]);
    });
    test('should prioritize contact matches over cached suggested matches', function () {
      var _computeSuggestedColl = computeSuggestedCollabs(contacts, suggestedCollabs, 'ser'),
          _computeSuggestedColl2 = _slicedToArray(_computeSuggestedColl, 2),
          suggested = _computeSuggestedColl2[0],
          rest = _computeSuggestedColl2[1];

      expect(suggested).toEqual([suggestedCollabs['2'], suggestedCollabs['3'], suggestedCollabs['4']]);
      expect(rest).toEqual([contacts[0]]);
    });
    test('should limit suggestions to maxSuggestions', function () {
      var _computeSuggestedColl3 = computeSuggestedCollabs(contacts, suggestedCollabs, 'User', 1),
          _computeSuggestedColl4 = _slicedToArray(_computeSuggestedColl3, 2),
          suggested = _computeSuggestedColl4[0],
          rest = _computeSuggestedColl4[1];

      expect(suggested).toEqual([suggestedCollabs['2']]);
      expect(rest).toEqual([contacts[0], contacts[2]]);
    });
    test('should match suggested collaborators even when options are empty if a search matches', function () {
      var result = computeSuggestedCollabs([], suggestedCollabs, 'User')[0];
      expect(result).toEqual([suggestedCollabs['2'], suggestedCollabs['3']]);
    });
    test('should match suggested collaborators by email address', function () {
      var result = computeSuggestedCollabs([], suggestedCollabs, 'zzz')[0];
      expect(result).toEqual([suggestedCollabs['3']]);
    });
    test('should not match suggested collaborators on email address domain', function () {
      var result = computeSuggestedCollabs([], suggestedCollabs, 'box')[0];
      expect(result).toEqual([]);
    });
    test('should not match suggested collaborators when search is less than minCharacters', function () {
      var result = computeSuggestedCollabs([], suggestedCollabs, 'User', 3, 5)[0];
      expect(result).toEqual([]);
    });
  });
});