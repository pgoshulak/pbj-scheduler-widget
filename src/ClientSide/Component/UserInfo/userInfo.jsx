import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phone: null,
      email: null
    };
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    //console.log("name of input",name)
    //console.log("value",value);
    this.setUserInfoState(name, value);
  }

  setUserInfoState = (key, value) => {
    this.setState({[key]: value});
  }


  render(){
    return (
      <div>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            name = "name"
            onBlur = { this.handleBlur }
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Phone Number</InputLabel>
          <Input
            name ="phone"
            onBlur = { this.handleBlur }
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>E-mail</InputLabel>
          <Input
            name ="email"
            onBlur = { this.handleBlur }
          />
        </FormControl>
      </div>
    )
  }
}

export default UserInfo;