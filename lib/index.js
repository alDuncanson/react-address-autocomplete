'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Google address autocomplete input
 */
var AddressInput = function AddressInput(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? 'Address' : _ref$placeholder,
      _ref$handleAddress = _ref.handleAddress,
      handleAddress = _ref$handleAddress === undefined ? function () {
    return console.log('handle address');
  } : _ref$handleAddress,
      _ref$apiKey = _ref.apiKey,
      apiKey = _ref$apiKey === undefined ? '' : _ref$apiKey;

  // stateful variable  for Google's Places Autocomplete Service
  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      autocomplete = _useState2[0],
      setAutocomplete = _useState2[1];

  // stateful user query string


  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      input = _useState4[0],
      setInput = _useState4[1];

  // stateful array of Google's predicted addresses


  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      predictions = _useState6[0],
      setPredictions = _useState6[1];

  var predictionList = (0, _react.useRef)();

  /**
   * @description create and load script element for Google's maps API
   * 
   * @param {Function} callback - callback after script is loaded
   */
  var loadGoogleMapsAPI = function loadGoogleMapsAPI(callback) {

    var googleScript = document.getElementById('googleMaps');

    if (!googleScript) {
      var script = document.createElement('script');

      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=places';
      script.id = 'googleMaps';

      document.body.appendChild(script);

      script.onload = function () {
        return callback();
      };
    }
  };

  // load Google's maps API then instantiate an instance of Google's Places autocomplete service
  (0, _react.useEffect)(function () {
    loadGoogleMapsAPI(function () {
      setAutocomplete(new window.google.maps.places.AutocompleteService());
    });
  }, []);

  /**
   * @description get array of predictions based on user query
   * 
   * @param {String} input - the user's address query
   */
  var getPredictions = function getPredictions(input) {
    autocomplete.getPlacePredictions({ input: input }, function (predictions) {
      if (predictions) {
        setPredictions(predictions.map(function (prediction) {
          return prediction.description;
        }));
      }
    });
  };

  // as the user types, get predictions only if there is a query
  (0, _react.useEffect)(function () {
    if (input.length > 0) {
      getPredictions(input);
    }
  }, [input]);

  /**
   * @description on click, set the selected address as the input value
   * 
   * @param {String} address - the user's selected address string
   */
  var selectAddress = function selectAddress(address) {
    return setInput(address);
  };

  /**
   * @description only show the list of predicted addresses if any
   * 	predictions exist and if the user's query is not an empty string,
   * 	otherwise hide the list
   * 
   * @return {Boolean} true/false - show or hide list of predictions
   */
  var showPredictions = function showPredictions() {
    if (predictions.length === 0 || input.length === 0) {
      return false;
    } else {
      if (predictions.includes(input)) {
        return false;
      } else {
        return true;
      }
    }
  };

  // on component mount, add a keydown event listener and remove on unmount
  (0, _react.useEffect)(function () {
    document.addEventListener('keydown', handleKeyDown);

    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /**
   * @description handle arrow key presses to move up and down
   * 	through the prediction list, only if the prediction list
   * 	exists
   * 
   * @param {KeyboardEvent} event - a keyboard event object containing 
   * 	information about the user interaction with the keyboard
   */
  var handleKeyDown = function handleKeyDown(_ref2) {
    var code = _ref2.code;

    switch (code) {
      case 'ArrowUp':
        handleArrowUp();
        break;
      case 'ArrowDown':
        handleArrowDown();
        break;
      case 'Enter':
        handleEnter();
        break;
    }
  };

  // if possible, focus the previous prediction, otherwise focus the text input
  var handleArrowUp = function handleArrowUp() {
    if (predictionList.current) {
      if (document.activeElement.previousSibling) {
        document.activeElement.previousSibling.focus();
      } else {
        document.getElementById('autocomplete-address-input').focus();
      }
    }
  };

  // if possible, focus the next prediction
  var handleArrowDown = function handleArrowDown() {
    if (predictionList.current) {
      if (document.activeElement.className !== 'prediction') {
        predictionList.current.childNodes[0].focus();
      } else {
        if (document.activeElement.nextSibling) {
          document.activeElement.nextSibling.focus();
        }
      }
    }
  };

  // set the current focused prediction as the selected address
  var handleEnter = function handleEnter() {
    if (predictionList.current) {
      setInput(document.activeElement.childNodes[0].innerHTML);
    }
  };

  (0, _react.useEffect)(function () {
    return handleAddress(input);
  }, [input]);

  /**
   * return jsx
   */
  return _react2.default.createElement(
    'div',
    { className: 'Address_Input' },
    _react2.default.createElement('input', {
      type: 'text',
      style: style,
      id: 'autocomplete-address-input',
      className: 'address-input',
      placeholder: placeholder,
      value: input,
      onChange: function onChange(_ref3) {
        var _ref3$address = _ref3.address,
            address = _ref3$address === undefined ? event.target.value : _ref3$address;
        return setInput(address);
      }
    }),
    showPredictions() && _react2.default.createElement(
      'div',
      { className: 'predictions-container' },
      _react2.default.createElement(
        'div',
        { className: 'predictions-list', ref: predictionList },
        predictions.map(function (prediction, key) {
          return _react2.default.createElement(
            'div',
            {
              key: key,
              className: 'prediction',
              tabIndex: '0',
              onClick: function onClick() {
                return selectAddress(prediction);
              }
            },
            _react2.default.createElement(
              'p',
              { className: 'prediction-text' },
              prediction
            )
          );
        })
      )
    )
  );
};

exports.default = AddressInput;
module.exports = exports['default'];