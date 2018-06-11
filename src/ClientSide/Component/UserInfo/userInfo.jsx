import React, { Component } from 'react';
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

  componentDidMount() {
    const { clientInfo } =  this.props;
    //console.log("client info",this.props.clientInfo)
    this.setState({
      name: clientInfo.name,
      phone: clientInfo.phone,
      email: clientInfo.email
    })
  }

  buildUser = () => {
    const userPackage = {
      packageType: "userInfo",
      userInfo: {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email
      }
    }
    return userPackage;
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    const myPromise = new Promise( (resolve, reject) => {
      this.setUserInfoState(name, value);
      resolve();
    });
    myPromise.then( () => {
      this.props.handleClientInput(this.buildUser());
    });
  }

  setUserInfoState = (key, value) => {
    this.setState( () => ({
      [key]: value
    }));
  }

  render(){
    return (
      <div>
        <h3>Your Contact Information</h3>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            value = {this.state.name || ""}
            name = "name"
            onChange = { this.handleOnChange }
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Phone Number</InputLabel>
          <Input
            value = {this.state.phone || ""}
            name ="phone"
            onChange = { this.handleOnChange }
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>E-mail</InputLabel>
          <Input
            value = {this.state.email || ""}
            name ="email"
            onChange = { this.handleOnChange }
          />
        </FormControl>
      </div>
    )
  }
}

export default UserInfo;