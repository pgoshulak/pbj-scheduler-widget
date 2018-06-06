import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Publishable from '../../../stripekeys.json';
import StripeCheckout from 'react-stripe-checkout';
import ConfirmationServices from './confirmationServices.jsx'
import axios from 'axios';


class Checkboxes extends React.Component {
  state = {
    checkedA: false,
    checkedB: false
  };

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

  render() {
    const clientServices = this.props.selectedServices.map(info => {
      return <ConfirmationServices key={info.billingCode} selectedServices={info}/>
    })
    let total = 0;
    const amount = this.props.selectedServices.map(info => {
      return total += info.priceCents;
    })
    return (
      <div>
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
          <StripeCheckout
          name={this.props.nameOfBusiness.name}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwhycbURUXcBANlvwjI-YQNnuGQpICYXl2LsQCB025Pwddz9PP"
          amount={total}
          token={this.onToken}
          stripeKey={Publishable.keyPublishable}
          /> : <span> Pay Online </span>
        }
      </div>
    )
  }
}

export default Checkboxes;
