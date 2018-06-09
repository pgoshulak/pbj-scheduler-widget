import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Checkout extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    console.log("business info", this.props.business);
    console.log("selectedServices",this.props.selectedServices);
    console.log("client info", this.props.clientInfo);
    console.log("selected appointment", this.props.selectedAppointment);
  }

  render() {
    return(
      <Card>
        <CardContent>
          <p>Thank you for booking an appointment with {this.props.business.name}.</p>
          <p>Your appointment is located at {this.props.business.address} <br/>
          and is from {/*this.props.selectedAppointment.start} to {this.props.selectedAppointment.end*/}
          for the following servies.</p>

          <ul>
            {
              this.props.selectedServices.forEach(function(service) {
                <li>service</li>
              })
            }
          </ul>



        </CardContent>
      </Card>
    );
  }
}

export default Checkout;