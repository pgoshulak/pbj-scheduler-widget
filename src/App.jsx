import React, { Component } from 'react';
import './App.css';
import { COMPONENT } from './dev.json'

import Calendar from './Calendar'
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

handleClientInput = (Input) => {

}

handleServices = (service, flag) => {
  if (flag === true){
    this.addNewService(service);
  } else if (flag === false){
    this.removeService(service);
  }
}

//-------------state functions----------------------

addNewService = (service) => {
  this.setState(previousState => ({
    services: [...previousState.services, service],//updates the services array in state
  }));
}

replaceServices = (newServices) => {
  this.setState({services: newServices})
}

removeService = (match) => {
  let newService = [];
  newService = this.state.services.filter(service => service.billingCode !== match.billingCode)
  this.replaceServices(newService);
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
        <ComponentToDevelop services={ServiceData} handleServices={this.handleServices}/>
      </div>
    );
  }
}

export default App;
