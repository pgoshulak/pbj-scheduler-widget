import React, { Component } from 'react';
import './App.css';
import { COMPONENT } from './dev.json'

import Calendar from './ClientSide/Component/Calendar'
import Stepper from './ClientSide/Component/Stepper/stepper.jsx'

import ServiceData from './DummyData/services.json'
// import Info from './ClientSide/Component/UserInfo/userInfo.jsx'
// import JeffsNewComponent from './JeffsNewComponent'


//--------------------------------------------------
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      client: {name: null, email: null, phone: null},
      services: [],
      confirmation: {}
    };
  }

//--------------handle functions---------------------
//function that determines what happens to client input based on package type
handleClientInput = (clientPackage) => {
  switch (clientPackage.packageType){
    case 'service':
      this.handleServices(clientPackage);
      break;
    case 'calendar':
      this.handleCalendar(clientPackage);
      break;
    default:
      console.log("you did something wrong jeff");
  }
}
//handles services, either adds to removes them from state
handleServices = (servicePackage) => {
  if (servicePackage.flag === true){
    this.addNewService(servicePackage.service);
  } else if (servicePackage.flag === false){
    this.removeService(servicePackage.service);
  }
}

// Handle event data sent from Calendar component
handleCalendar = (calendarPackage) => {
  console.log(calendarPackage)
}

//-------------Service Functions----------------------

addNewService = (service) => {
  this.setState(previousState => ({
    services: [...previousState.services, service],//updates the services array in state
  }));
}

removeService = (match) => {
  let newService = [];
  newService = this.state.services.filter(service => service.billingCode !== match.billingCode)
  this.replaceServices(newService);
}

replaceServices = (newServices) => {
  this.setState({services: newServices})
}

//--------------------------------------------------

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
        <ComponentToDevelop
          services={ServiceData}
          handleClientInput={this.handleClientInput}
        />
      </div>
    );
  }
}

export default App;
