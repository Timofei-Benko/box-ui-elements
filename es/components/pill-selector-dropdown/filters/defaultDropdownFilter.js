import isEqual from 'lodash/isEqual';

// Filter out anything that has already been selected to prevent duplicates
function getDuplicatesFilter(selectedValues) {
  var values = Array.isArray(selectedValues) ? selectedValues : [];
  return function (option) {
    return !values.find(function (value) {
      return isEqual(value, option);
    });
  };
} // Filter out anything that does not match the display text of the options


function getTextFilter(inputText) {
  var text = inputText || '';
  return function (option) {
    return option.displayText.toLowerCase().includes(text.toLowerCase());
  };
}

function defaultDropdownFilter(options, selectedValues, inputText) {
  return options.filter(getDuplicatesFilter(selectedValues)).filter(getTextFilter(inputText));
}

export default defaultDropdownFilter;
//# sourceMappingURL=defaultDropdownFilter.js.map