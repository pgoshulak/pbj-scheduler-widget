import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import CardSection from './cardSection.jsx'

class Checkoutform extends React.Component {

  handleSubmit = (event) => {

    event.preventDefault();
    console.log(event.target)
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
      this.props.sendAppointment(token);
    });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(Checkoutform);