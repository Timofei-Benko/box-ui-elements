function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import mergeContacts from '../mergeContacts';
describe('features/unified-share-modal/utils/mergeContacts', function () {
  var email = 'dev@box.com';
  var displayText = email;
  var id = email;
  var isExternalUser = true;
  var name = 'dev';
  var text = email;
  var type = 'user';
  var value = email;
  var contact = {
    displayText: displayText,
    text: text,
    value: value
  };
  var existingContacts = [contact];
  test('should take existing contacts and merge with new contacts', function () {
    var fetchedContacts = _defineProperty({}, email, {
      email: email,
      id: id,
      isExternalUser: isExternalUser,
      name: name,
      type: type
    });

    var expectedMergedContacts = [{
      email: email,
      id: id,
      isExternalUser: isExternalUser,
      name: name,
      text: name,
      type: type,
      value: value
    }];
    var mergedContacts = mergeContacts(existingContacts, fetchedContacts);
    expect(mergedContacts).toEqual(expectedMergedContacts);
  });
  test('should return existing contact information if there is no new contact information in fetched contacts', function () {
    var fetchedContacts = {};
    var expectedMergedContacts = [{
      email: email,
      id: id,
      isExternalUser: isExternalUser,
      text: text,
      type: type,
      value: value
    }];
    var mergedContacts = mergeContacts(existingContacts, fetchedContacts);
    expect(mergedContacts).toEqual(expectedMergedContacts);
  });
  test('should return existing contact information if value matches but case does not match', function () {
    var caseSensitiveEmail = 'DeV@Box.COM';

    var fetchedContacts = _defineProperty({}, email, {
      email: email,
      id: id,
      isExternalUser: isExternalUser,
      name: name,
      type: type
    });

    var existingContactWithCaseChanges = [{
      displayText: caseSensitiveEmail,
      text: caseSensitiveEmail,
      value: caseSensitiveEmail
    }];
    var expectedMergedContacts = [{
      email: email,
      id: id,
      isExternalUser: isExternalUser,
      text: name,
      name: name,
      type: type,
      value: value
    }];
    var mergedContacts = mergeContacts(existingContactWithCaseChanges, fetchedContacts);
    expect(mergedContacts).toEqual(expectedMergedContacts);
  });
  test('should return external user if not matched to internal user record', function () {
    var newEmail = 'dev+test@box.com';
    var newContact = [{
      displayText: newEmail,
      text: newEmail,
      value: newEmail
    }];
    var expected = [{
      email: newEmail,
      id: newEmail,
      isExternalUser: isExternalUser,
      text: newEmail,
      type: 'user',
      value: newEmail
    }];
    expect(mergeContacts(newContact, {})).toEqual(expected);
  });
});