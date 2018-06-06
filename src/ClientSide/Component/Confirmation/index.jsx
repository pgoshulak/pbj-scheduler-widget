import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'


class Checkboxes extends React.Component {
  state = {
    message: 'Waiting for user selection',
    checkedA: false,
    checkedB: false
  };
  
  sendAppointmentToServer = () => {
    this.setState({message: 'Sending appointment data to server'}) 
    const appointment_url = `http://localhost:5000/api/business/${this.props.business._id}/appointment`
    const appointment = {
      event: {
        start: this.props.selectedAppointment.start,
        end: this.props.selectedAppointment.end
      },
      // Array of billing codes, so we don't have to send the entire service object's data
      services: this.props.selectedServices.map(service => service.billingCode),
      customer: {
        name: this.props.clientInfo.name,
        email: this.props.clientInfo.email,
        phone: this.props.clientInfo.phone
      },
      stripeData: {
        // Ben: put what you need to send to server here
      }
    }
    axios.post(appointment_url, {data: appointment}).then(res => {
      console.log(res)
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.value]:true})
    if (event.target.value === "checkedA"){
      this.setState({checkedB: false})
    } else {
      this.setState({checkedA: false} )
    }
  }

  render() {
    return (
      <div>
        <div id="message-area">{this.state.message}</div>
        <Checkbox
          checked={this.state.checkedA}
          onChange={this.handleChange}
          value="checkedA"
        />
        <span> Pay at store </span>
        <Checkbox
          checked={this.state.checkedB}
          onChange={this.handleChange}
          value="checkedB"
        />
        <span>
          Pay with card
        </span>
        <button onClick={this.sendAppointmentToServer}>POST to server</button>
      </div>
    )
  }
}

export default Checkboxes;
