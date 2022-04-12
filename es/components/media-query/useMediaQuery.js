function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { toQuery, useMediaQuery as _useMediaQuery } from 'react-responsive';
import { ANY_HOVER, ANY_POINTER_COARSE, ANY_POINTER_FINE, HOVER, HOVER_TYPE, POINTER_COARSE, POINTER_FINE, POINTER_TYPE, SIZE_LARGE, SIZE_MEDIUM, SIZE_SMALL, VIEW_SIZE_TYPE } from './constants';

var getPointerCapabilities = function getPointerCapabilities(isFine, isCoarse) {
  if (!isFine && !isCoarse) return POINTER_TYPE.none;
  if (isFine) return POINTER_TYPE.fine;
  return POINTER_TYPE.coarse;
};

var getViewDimensions = function getViewDimensions() {
  return {
    viewWidth: window.innerWidth,
    viewHeight: window.innerHeight
  };
};
/**
 * Formats the media query either as a MediaQuery object or string
 * @param query
 * @returns {string}
 */


function formatQuery(query) {
  return typeof query === 'string' ? query : toQuery(query);
}
/**
 * Executes media query
 * @param query
 * @param onQueryChange
 * @returns {boolean}
 */


function useQuery(query, onQueryChange) {
  return _useMediaQuery({
    query: formatQuery(query)
  }, null, onQueryChange);
}
/**
 * Determines device capabilities for hover and pointer features
 * @returns {{anyPointer: *, hover: (string), pointer: *, anyHover: (string)}}
 */


function useDeviceCapabilities() {
  var isHover = useQuery(HOVER);
  var isAnyHover = useQuery(ANY_HOVER);
  var anyHover = isAnyHover ? HOVER_TYPE.hover : HOVER_TYPE.none;
  var hover = isHover ? HOVER_TYPE.hover : HOVER_TYPE.none;
  var pointer = getPointerCapabilities(useQuery(POINTER_FINE), useQuery(POINTER_COARSE));
  var anyPointer = getPointerCapabilities(useQuery(ANY_POINTER_FINE), useQuery(ANY_POINTER_COARSE));
  return {
    anyHover: anyHover,
    hover: hover,
    anyPointer: anyPointer,
    pointer: pointer
  };
}
/**
 * Determines device size using media queries
 * @returns {string}
 */


function useDeviceSize() {
  var isSmall = useQuery(SIZE_SMALL);
  var isMedium = useQuery(SIZE_MEDIUM);
  var isLarge = useQuery(SIZE_LARGE);
  if (isSmall) return VIEW_SIZE_TYPE.small;
  if (isMedium) return VIEW_SIZE_TYPE.medium;
  if (isLarge) return VIEW_SIZE_TYPE.large;
  return VIEW_SIZE_TYPE.xlarge;
}

function useMediaQuery() {
  var deviceCapabilities = useDeviceCapabilities();
  var deviceSize = useDeviceSize();
  var viewDimensions = getViewDimensions();
  return _objectSpread({}, deviceCapabilities, {}, viewDimensions, {
    size: deviceSize
  });
}

export default useMediaQuery;
//# sourceMappingURL=useMediaQuery.js.map