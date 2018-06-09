import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Publishable from '../../../stripekeys.json';
import StripeCheckout from 'react-stripe-checkout';
import ConfirmationServices from './confirmationServices.jsx'
import axios from 'axios';
import {StripeProvider} from 'react-stripe-elements';
import Checkout from './checkout.jsx';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    backgroundColor: '#f6f9fd'
  }
});

class SimpleTabs extends React.Component {
  state = {
    message: 'Waiting for user selection',
    text: false,
    email: false,
    value: 0
  };

  sendAppointmentToServer = (stripeToken) => {
    this.setState({message: 'Sending appointment data to server'})
    const appointment_url = `http://localhost:5000/api/business/${this.props.business._id}/appointment`
    const appointment = {
      event: {
        start: this.props.selectedAppointment.start,
        end: this.props.selectedAppointment.end
      },
      // TODO: Send only billing codes, to reduce data transfer
      services: this.props.selectedServices,
      // TODO: Calculate price on server, NOT client, via services
      totalPrice: this.props.selectedServices.reduce((total, service) => {
        return total + service.priceCents
      }, 0),
      customer: {
        name: this.props.clientInfo.name,
        email: this.props.clientInfo.email,
        phone: this.props.clientInfo.phone
      },
      stripeData: {
        token: stripeToken
      },
      typeOfConfirmation: {
        text: this.state.text,
        email: this.state.email
      }
    }
    if (this.state.email && this.state.text) {
      axios.post(appointment_url, {data: appointment}).then(res => {
        if (res.status === 200) {
          this.props.handleConfirmation(true)
        }
      })
    } else if (this.state.email || this.state.text) {
      axios.post(appointment_url, {data: appointment}).then(res => {
        if (res.status === 200) {
          this.props.handleConfirmation(true)
        }
      })
    } else {
      axios.post(appointment_url, {data: appointment}).then(res => {
        if (res.status === 200) {
          this.props.handleConfirmation(true)
        }
      })
    }
  }

  handleChange = (event, value) => {
    console.log(event, value)
    this.setState({ value });
  };

  checkBoxChange = (event) => {
    const selection = event.target.value;
    if (this.state[selection]) {
      this.setState({[event.target.value]: false})
    } else {
      this.setState({[event.target.value]: true})
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    const clientServices = this.props.selectedServices.map(service => {
      return <ConfirmationServices key={service.billingCode} service={service}/>
    })

    return (
      <div>
        <div id="message-area">{this.state.message}</div>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab label="Pay with Card" />
              <Tab label="Pay with Cash" />
            </Tabs>
          </AppBar>
          <Paper className={classes.paper}>
          {value === 0 &&
          <TabContainer>
            {clientServices}
            <StripeProvider apiKey={Publishable.keyPublishable}>
              <Checkout checkBoxState={this.state} checkBoxChange={this.checkBoxChange} sendAppointment={this.sendAppointmentToServer} clientInfo={this.props.clientInfo}/>
            </StripeProvider>
          </TabContainer>}
          {value === 1 &&
            <TabContainer>
              {clientServices}
              <Checkbox
                checked={this.state.text}
                onChange={this.checkBoxChange}
                value="text"
              />
              <span>Text me Confirmation</span>
              <Checkbox
                  checked={this.state.email}
                  onChange={this.checkBoxChange}
                  value="email"
                />
              <span>Email me Confirmation</span>
              <div><button onClick={() => this.sendAppointmentToServer()}>Confirm Appointment</button></div>
            </TabContainer>}
          </Paper>
        </div>
      </div>
    )
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SimpleTabs);