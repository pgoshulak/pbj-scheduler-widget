import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  //componentWillMount() is unsafe according to the documentation
  //look into this later
  componentWillMount(){
    if(this.props.selectedServices.length !== 0){
      for (let service of this.props.selectedServices) {
        if(service.billingCode === this.props.service.billingCode){
          this.checkState(true);//on load checks the box if this service is selected previously
        }
      }
    }
  }

  buildService = (isChecked) => {
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
    }else if(this.state.isChecked === true){
      this.checkState(false);
      this.props.handleClientInput(this.buildService(false));
    }
  }

  checkState = ( flag ) => {
    this.setState({isChecked: flag});
  }

  render(){
    return (
      <div>
        <Checkbox onChange = { this.handleCheckBox } defaultChecked={this.state.isChecked}/>
        <span>{this.props.service.description}</span>
        <span>{this.props.service.priceCents}</span>
        <span>{this.props.service.durationMin}</span>
      </div>
    )
  }
}

export default Service;