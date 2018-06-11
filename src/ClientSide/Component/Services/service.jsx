import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

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
        <TableBody>
          <TableRow>
            <TableCell><Checkbox onChange = { this.handleCheckBox } defaultChecked={this.state.isChecked}/></TableCell>
            <TableCell numeric>{this.props.service.description}</TableCell>
            <TableCell numeric>${(this.props.service.priceCents/100.0).toFixed(2)}</TableCell>
            <TableCell numeric>{this.props.service.durationMin} Minutes</TableCell>
          </TableRow>
        </TableBody>
    )
  }
}

export default Service;