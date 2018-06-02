import React, { Component } from 'react';
import Service from '../Services/service.jsx';

function serviceList (props) {
  const serviceList = props.services.map((service, i) => {
    return <Service
      key={i}
      service={service}
      handleServices={props.handleServices}
      handleClientInput={props.handleClientInput}
    />
  });

  return (
    <div>
      {serviceList}
    </div>
  )
}

export default serviceList;