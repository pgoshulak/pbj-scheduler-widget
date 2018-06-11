import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './checkoutform.jsx'

class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <CheckoutForm checkBoxState={this.props.checkBoxState} progress={this.props.progress} checkBoxChange={this.props.checkBoxChange} sendAppointment={this.props.sendAppointment} clientInfo={this.props.clientInfo}/>
      </Elements>
    );
  }
}

export default Checkout;