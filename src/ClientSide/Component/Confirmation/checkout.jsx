import React from 'react';
import {Elements} from 'react-stripe-elements';

import CheckoutForm from './checkoutform.jsx'

class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <CheckoutForm sendAppointment={this.props.sendAppointment}/>
      </Elements>
    );
  }
}

export default Checkout;