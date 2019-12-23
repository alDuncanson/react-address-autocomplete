# react-address-autocomplete

![npm](https://img.shields.io/npm/dt/@alduncanson/react-address-autocomplete)
![license](https://img.shields.io/npm/l/@alduncanson/react-address-autocomplete)
![min](https://img.shields.io/bundlephobia/min/@alduncanson/react-address-autocomplete)

![stars](https://img.shields.io/github/stars/alDuncanson/react-address-autocomplete?style=social)

A simple text input for entering addresses using Google's Places API. You can try it out [here!](https://react-address-autocomplete.netlify.com/)

# Demo
![react address autocomplete demo gif](https://raw.githubusercontent.com/alDuncanson/react-address-autocomplete/master/autocomplete.gif)

# Install

_Requires React 16 or later_

```sh
npm install --save @alduncanson/react-address-autocomplete
```

or

```sh
yarn add @alduncanson/react-address-autocomplete
```

# Usage

```jsx
import React from 'react'
import './App.css'

import AddressInput from '@alDuncanson/react-address-autocomplete'

export const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ width: '34%' }}>
          <AddressInput apiKey='YOUR API KEY' handleAddress={address => console.log(address)}/>
        </div>
      </header>
    </div>
  )
}
```

After you start typing, you can then navigate through the prediction list with your mouse or keyboard with <kbd>&#8593;</kbd> and <kbd>&darr;</kbd> arrow keys and select your address by clicking or pressing the <kbd>Enter</kbd> key

# Props

- `style`: Object - style object for the `<input/>` element
- `placeholder`: String - input placeholder text. Otherwise defaults to 'Address'
- `handleAddress`: Callback - a function that takes the selected address as a parameter and returns it as a string
- `apiKey`: String - your Google Places API Key

# Contributing

Pull requests are welcome and greatly appreciated. As new as this module is, I am still working on setting up a proper contribution flow as well as making an actual build/bundling script to make helping out easier. If you have suggestions, submit them as an issue please :)