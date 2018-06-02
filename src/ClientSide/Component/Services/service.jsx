import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  buildService(isChecked){
    const servicePackage = {
      packageType: "service",
      service: this.props.service,
      flag: isChecked
    }
    return servicePackage;
  }

  handleCheckBox = () => {
    if (this.state.isChecked === false){
      this.checkState(true);
      this.props.handleClientInput(this.buildService(true));
      //this.props.handleServices(this.props.service, true)
    }else if(this.state.isChecked === true){
      this.checkState(false);
      this.props.handleClientInput(this.buildService(false));
      //this.props.handleServices(this.props.service, false)
    }
  }

  checkState = ( flag ) => {
    this.setState({isChecked: flag});
  }

  render(){
    return (
      <div>
        <Checkbox onChange = { this.handleCheckBox } />
        <span>{this.props.service.description}</span>
        <span>{this.props.service.priceCents}</span>
        <span>{this.props.service.durationMin}</span>
      </div>
    )
  }
}

export default Service;