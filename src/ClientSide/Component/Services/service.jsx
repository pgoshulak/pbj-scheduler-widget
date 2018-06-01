import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function Service (props){
  const service = props.service;
  return (
    <div>
      <Checkbox onChange = { () => {
        console.log("inside checkbox",service)
        props.handleServices(service)
        }
      }/>
      <span>{props.service.description}</span>
      <span>{props.service.priceCents}</span>
      <span>{props.service.durationMin}</span>
    </div>
  )
}

export default Service;