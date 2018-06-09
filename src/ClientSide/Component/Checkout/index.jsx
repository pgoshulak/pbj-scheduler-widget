import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Moment from 'moment';

class Checkout extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    // console.log("business info", this.props.business);
    // console.log("selectedServices",this.props.selectedServices);
    // console.log("client info", this.props.clientInfo);
    // console.log("selected appointment", this.props.selectedAppointment);
  }

  render() {
    let totalPrice = 0;
    const services = this.props.selectedServices.map(function(service, i) {
                totalPrice += service.priceCents;
                return (<p key={i}>{service.description} - <b>${(service.priceCents/100.0).toFixed(2)}</b></p>);
              });
    let tax = totalPrice*.13;
    return(
      <Card>
        <CardContent>
          <p>Thank you for booking an appointment with <b>{this.props.business.name}</b>.</p>
          <p>Your appointment is located at {this.props.business.address} <br/>
          From: <b>{this.props.selectedAppointment.start.toString().substring(0,21)}</b> <br />
          To: <b>{this.props.selectedAppointment.end.toString().substring(0,21)}</b></p>

          <p>for the following servies</p>
          {services}
          Total: <b>${((totalPrice + tax)/100.0).toFixed(2)} </b>

          <p>We've sent you a confirmation, See you soon!</p>
        </CardContent>
      </Card>
    );
  }
}

export default Checkout;