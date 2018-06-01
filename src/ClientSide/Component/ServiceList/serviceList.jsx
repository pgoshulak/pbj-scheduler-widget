import React, { Component } from 'react';
import Service from '../Services/service.jsx';

function serviceList (props) {
  const serviceList = props.services.map((service) => {
    return <Service service={service} handleServices={props.handleServices}/>
  });

  return (
    <div>
      {serviceList}
    </div>
  )
}

export default serviceList;