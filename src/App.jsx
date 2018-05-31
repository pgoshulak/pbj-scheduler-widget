import React, { Component } from 'react';
import './App.css';
import { COMPONENT } from './dev.json'

import Calendar from './Calendar'
import Stepper from './ClientSide/Component/Stepper/stepper.jsx'
// import JeffsNewComponent from './JeffsNewComponent'

class App extends Component {
  render() {
    // Set the component to develop
    let ComponentToDevelop = null
    if (COMPONENT === 'Calendar') {
      ComponentToDevelop = Calendar
    } else if (COMPONENT === 'Stepper') {
      ComponentToDevelop = Stepper
    }
    return (
      <div className="App">
        <ComponentToDevelop />
      </div>
    );
  }
}

export default App;
