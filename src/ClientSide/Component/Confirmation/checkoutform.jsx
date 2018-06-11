import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import Checkbox from '@material-ui/core/Checkbox';
import CardSection from './cardSection.jsx'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  checkbox = (event) => {
    this.props.checkBoxChange(event);
  }

  render () {
    const { classes, theme } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <Checkbox
          checked={this.props.checkBoxState.text}
          onChange={this.checkbox}
          value="text"
          />
        <span>Text me Confirmation</span>
        <Checkbox
          checked={this.props.checkBoxState.email}
          onChange={this.checkbox}
          value="email"
          />
        <span>Email me Confirmation</span>
        <div>{this.props.progress ? <CircularProgress className={classes.progress} size={50} />:<button className={classes.confirm}>PAY</button>}</div>
      </form>
    );
  }
}

Checkoutform.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectStripe(withStyles(styles)(Checkoutform));

//export default injectStripe(Checkoutform);