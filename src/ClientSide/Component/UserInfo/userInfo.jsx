import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



function UserInfo (){
   return (
      <div>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>Phone Number</InputLabel>
          <Input />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel>E-mail</InputLabel>
          <Input />
        </FormControl>
      </div>
    )
}

export default UserInfo;