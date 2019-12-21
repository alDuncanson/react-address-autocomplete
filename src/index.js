import React, { useState, useEffect, useRef } from 'react'
import './style.css'

/**
 * Google address autocomplete input
 */
const AddressInput = ({
  style = {},
  placeholder = 'Address',
  handleAddress = () => console.log('handle address'),
  apiKey = ''
}) => {

  // stateful variable  for Google's Places Autocomplete Service
  const [autocomplete, setAutocomplete] = useState({})

  // stateful user query string
  const [input, setInput] = useState('')

  // stateful array of Google's predicted addresses
  const [predictions, setPredictions] = useState([])

  const predictionList = useRef()

	/**
	 * @description create and load script element for Google's maps API
	 * 
	 * @param {Function} callback - callback after script is loaded
	 */
  const loadGoogleMapsAPI = callback => {

    const googleScript = document.getElementById('googleMaps')

    if (!googleScript) {
      const script = document.createElement('script')

      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.id = 'googleMaps'

      document.body.appendChild(script)

      script.onload = () => callback()
    }
  }

  // load Google's maps API then instantiate an instance of Google's Places autocomplete service
  useEffect(() => {
    loadGoogleMapsAPI(() => {
      setAutocomplete(new window.google.maps.places.AutocompleteService())
    })
  }, [])

	/**
	 * @description get array of predictions based on user query
	 * 
	 * @param {String} input - the user's address query
	 */
  const getPredictions = input => {
    autocomplete.getPlacePredictions(
      { input },
      predictions => {
        if (predictions) {
          setPredictions(predictions.map(prediction => prediction.description))
        }
      }
    )
  }

  // as the user types, get predictions only if there is a query
  useEffect(() => {
    if (input.length > 0) {
      getPredictions(input)
    }
  }, [input])

	/**
	 * @description on click, set the selected address as the input value
	 * 
	 * @param {String} address - the user's selected address string
	 */
  const selectAddress = address => setInput(address)

	/**
	 * @description only show the list of predicted addresses if any
	 * 	predictions exist and if the user's query is not an empty string,
	 * 	otherwise hide the list
	 * 
	 * @return {Boolean} true/false - show or hide list of predictions
	 */
  const showPredictions = () => {
    if (predictions.length === 0 || input.length === 0) {
      return false
    } else {
      if (predictions.includes(input)) {
        return false
      } else {
        return true
      }
    }
  }

  // on component mount, add a keydown event listener and remove on unmount
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

	/**
	 * @description handle arrow key presses to move up and down
	 * 	through the prediction list, only if the prediction list
	 * 	exists
	 * 
	 * @param {KeyboardEvent} event - a keyboard event object containing 
	 * 	information about the user interaction with the keyboard
	 */
  const handleKeyDown = ({ code }) => {
    switch (code) {
      case 'ArrowUp':
        handleArrowUp()
        break
      case 'ArrowDown':
        handleArrowDown()
        break
      case 'Enter':
        handleEnter()
        break
    }
  }

  // if possible, focus the previous prediction, otherwise focus the text input
  const handleArrowUp = () => {
    if (predictionList.current) {
      if (document.activeElement.previousSibling) {
        document.activeElement.previousSibling.focus()
      } else {
        document.getElementById('autocomplete-address-input').focus()
      }
    }
  }

  // if possible, focus the next prediction
  const handleArrowDown = () => {
    if (predictionList.current) {
      if (document.activeElement.className !== 'prediction') {
        predictionList.current.childNodes[0].focus()
      } else {
        if (document.activeElement.nextSibling) {
          document.activeElement.nextSibling.focus()
        }
      }
    }
  }

  // set the current focused prediction as the selected address
  const handleEnter = () => {
    if (predictionList.current) {
      setInput(document.activeElement.childNodes[0].innerHTML)
    }
  }

  useEffect(() => handleAddress(input), [input])

	/**
	 * return jsx
	 */
  return (
    <div className='Address_Input'>
      <input
        type='text'
        style={style}
        id='autocomplete-address-input'
        className='address-input'
        placeholder={placeholder}
        value={input}
        onChange={({ address = event.target.value }) => setInput(address)}
      />
      {
        showPredictions() &&
        <div className='predictions-container'>
          <div className='predictions-list' ref={predictionList}>
            {
              predictions.map((prediction, key) => {
                return (
                  <div
                    key={key}
                    className='prediction'
                    tabIndex='0'
                    onClick={() => selectAddress(prediction)}
                  >
                    <p className='prediction-text'>{prediction}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export default AddressInput