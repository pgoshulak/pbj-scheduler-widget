import React from 'react';
import {injectStripe} from 'react-stripe-elements';

import CardSection from './cardSection.jsx'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  confirm: {
    backgroundColor: '#6671e6',
    color: 'white',
    fontSize: '14px',
    padding: '11px',
    borderRadius: '5px',
    textAlign: 'left'
  }
});

class Checkoutform extends React.Component {

  handleSubmit = (event) => {

    event.preventDefault();
    const customerName = this.props.clientInfo.name
    this.props.stripe.createToken({name: customerName}).then(({token}) => {
      console.log('Received Stripe token:', token);
      this.props.sendAppointment(token);
    });
  }

  render () {
    const { classes, theme } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button className={classes.confirm}>PAY</button>
      </form>
    );
  }
}

Checkoutform.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectStripe(withStyles(styles)(Checkoutform));

//export default injectStripe(Checkoutform);