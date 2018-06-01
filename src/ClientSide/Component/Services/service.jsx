import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  handleCheck = () => {
    if (this.state.isChecked === false){
      this.checkState(true);
      this.props.handleServices(this.props.service, true)
    }else if(this.state.isChecked === true){
      this.checkState(false);
      this.props.handleServices(this.props.service, false)
    }
  }

  checkState = ( flag ) => {
    this.setState({isChecked: flag});
  }

  render(){
    return (
      <div>
        <Checkbox onChange = { this.handleCheck } />
        <span>{this.props.service.description}</span>
        <span>{this.props.service.priceCents}</span>
        <span>{this.props.service.durationMin}</span>
      </div>
    )
  }
}

export default Service;