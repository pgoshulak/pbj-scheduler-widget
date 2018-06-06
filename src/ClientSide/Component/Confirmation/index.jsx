import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Publishable from '../../../stripekeys.json';
import StripeCheckout from 'react-stripe-checkout';
import ConfirmationServices from './confirmationServices.jsx'
import axios from 'axios';
import {StripeProvider} from 'react-stripe-elements';
import Checkout from './checkout.jsx';

class Checkboxes extends React.Component {
  state = {
    message: 'Waiting for user selection',
    checkedA: false,
    checkedB: false
  };

  sendAppointmentToServer = (stripeToken) => {
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
        token: stripeToken
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

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target)
    const testData = {
      stripe: {
      }
    }
    const inputFields = event.target.elements
    const cardNumber= {...testData.stripe, card_number: inputFields.card_number.value }
    const expiaryMonth = {...cardNumber, exp_month: inputFields.exp_month.value}
    const expiaryYear = {...expiaryMonth, exp_year: inputFields.exp_year.value}
    const stripeToken = {...expiaryYear, cvc: inputFields.cvc.value}
    console.log(stripeToken)

  }

  render() {
    const clientServices = this.props.selectedServices.map(service => {
      return <ConfirmationServices key={service.billingCode} service={service}/>
    })
    let total = 0;
    const amount = this.props.selectedServices.map(info => {
      return total += info.priceCents;
    })
    return (
      <div>
        <div id="message-area">{this.state.message}</div>
        {clientServices}
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
        {this.state.checkedB ?
          <StripeProvider apiKey={Publishable.keyPublishable}>
            <Checkout sendAppointment={this.sendAppointmentToServer} clientInfo={this.props.clientInfo} />
          </StripeProvider>
           : <span> Pay Online </span>
        }
        <button onClick={this.sendAppointmentToServer}>POST to server</button>
      </div>
    )
  }
}

export default Checkboxes;
