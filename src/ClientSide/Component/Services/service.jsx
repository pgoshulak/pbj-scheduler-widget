import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function Service (props){
  return (
    <div>
      <Checkbox />
      <span>{props.service.description}</span>
      <span>{props.service.priceCents}</span>
      <span>{props.service.durationMin}</span>
    </div>
  )
}

export default Service;