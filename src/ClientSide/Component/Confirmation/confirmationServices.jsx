import React from 'react';


class confirmationServices extends React.Component {
  render(){
    return (
      <div>
        <span>{this.props.selectedServices.description}</span>
        <span>{this.props.selectedServices.priceCents}</span>
        <span>{this.props.selectedServices.durationMin}</span>
      </div>
    )
  }
}

export default confirmationServices;