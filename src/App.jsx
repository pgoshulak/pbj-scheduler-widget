import React, { Component } from 'react';
import './App.css';
import { COMPONENT } from './dev.json'

import Calendar from './ClientSide/Component/Calendar'
import Stepper from './ClientSide/Component/Stepper/stepper.jsx'

import axios from 'axios' //pulls data from db
// import Info from './ClientSide/Component/UserInfo/userInfo.jsx'
// import JeffsNewComponent from './JeffsNewComponent'


//--------------------------------------------------
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      business: {
        name: '',
        services: []
      },
      client: {
          name: null,
          email: null,
          phone: null
      },
      services: [],
      selectedAppointment: {},
      confirmation: {}
    };
  }

//--------------life cycle functions-----------------

componentDidMount(){
  this.fetchBusinessData("123456123456123456123456");
}

//---------------fetch functions-----------------------

fetchBusinessData = (businessId) => {
    axios.get(`http://localhost:5000/api/business/${businessId}`)
      .then(res => {
        const business = res.data[0]
        if (!business) throw new Error(`Error fetching data from business ID ${businessId}`)
        this.setState({business: business})
      }).catch(err => {
        console.error(err)
      })
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
    case 'userInfo':
      this.handleUserInfo(clientPackage);
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
  this.setCalendarState(calendarPackage.packageData);
}

handleUserInfo = (userPackage) => {
  this.setUserState(userPackage.userInfo);
}

//-------------Business Functions---------------------
//maybe you don't need this
setBusinessState = (business) => {
  // this.setState({business: business});
  // console.log(this.state.business.services);

  const myPromise = new Promise( (resolve, reject) => {
      this.setState({business: business});
      resolve();
    });
    myPromise.then( () => {
      console.log("services",this.state.business.services);
    });

}

//-------------Service Functions----------------------

addNewService = (service) => {
  this.setState(previousState => ({
    services: [...previousState.services, service]//updates the services array in state
  }));
}

removeService = (match) => {
  let newService = [];
  newService = this.state.services.filter( service => service.billingCode !== match.billingCode);
  this.setServicesState(newService);
}

setServicesState = (newServices) => {
  this.setState({services: newServices})
}

//-------------Calendar Functions--------------------

setCalendarState = (newAppointment) => {
  this.setState({selectedAppointment: newAppointment});
}

//--------------User Info Functions-----------------

setUserState = (userInfo) => {
  this.setState({client: userInfo});
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
          //services={ServiceData}
          // TODO: Deprecate 'services' prop in favour of parent 'business' prop
          services={this.state.business.services}
          business={this.state.business}
          client={this.state.client}
          handleClientInput={this.handleClientInput}
          selectedServices={this.state.services}
          selectedAppointment={this.state.selectedAppointment}
        />
      </div>
    );
  }
}

export default App;
