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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  },
  tabBar: {
    backgroundColor: '#F0F0F0'
  },
  table: {
    minWidth: 700,
  },
  confirm: {
    backgroundColor: '#6671e6',
    color: 'white',
    fontSize: '14px',
    padding: '11px',
    borderRadius: '5px',
    textAlign: 'left'
  }
});

class SimpleTabs extends React.Component {
  state = {
    text: false,
    email: false,
    value: 0,
    progress: false
  };

  sendAppointmentToServer = (stripeToken) => {
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
    this.setState({progress: true})
    axios.post(appointment_url, {data: appointment}).then(res => {
      console.log(res)
      if (res.status === 200) {
        this.props.handleConfirmation(true)
      }
    })
  }

  handleChange = (event, value) => {
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
    const totalPrice = this.props.selectedServices.reduce((total, service) => {
        return total + service.priceCents
      }, 0)
    const totalDuration = this.props.selectedServices.reduce((total, service) => {
        return total + service.durationMin
      }, 0)

    return (
      <div>
        <div className={classes.root}>
          <Paper className={classes.tabBar}>
            <Tabs indicatorColor="primary" value={value} textColor="primary" onChange={this.handleChange} centered>
              <Tab label="Pay with Card" />
              <Tab label="Pay with Cash" />
            </Tabs>
          </Paper>
          <Paper className={classes.paper}>
            {value === 0 &&
            <TabContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Service Description</TableCell>
                    <TableCell numeric>Duration (min)</TableCell>
                    <TableCell numeric>Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                {clientServices}
                <TableFooter>
                    <TableRow>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell numeric>Total Duration: {totalDuration}</TableCell>
                      <TableCell numeric>Total Price: ${(totalPrice/100).toFixed(2)}</TableCell>
                    </TableRow>
                </TableFooter>
              </Table>
              <StripeProvider apiKey={Publishable.keyPublishable}>
                <Checkout
                  checkBoxState={this.state}
                  checkBoxChange={this.checkBoxChange}
                  sendAppointment={this.sendAppointmentToServer}
                  clientInfo={this.props.clientInfo}
                  progress= {this.state.progress}
                  />
              </StripeProvider>
            </TabContainer>}
            {value === 1 &&
              <TabContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Service Description</TableCell>
                      <TableCell numeric>Duration (min)</TableCell>
                      <TableCell numeric>Price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  {clientServices}
                  <TableFooter>
                    <TableRow>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell numeric>Total Duration: {totalDuration}</TableCell>
                      <TableCell numeric>Total Price: ${(totalPrice/100).toFixed(2)}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
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
                <div>{this.state.progress ? <CircularProgress className={classes.progress} size={50} />:<button className={classes.confirm} onClick={() => this.sendAppointmentToServer()}>Confirm Appointment</button> }</div>
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