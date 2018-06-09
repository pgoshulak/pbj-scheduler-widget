import React from 'react';
import Service from '../Services/service.jsx';

function serviceList (props) {
  const serviceList = props.services.map((service, i) => {
    return <Service
      key={i}
      service={service}
      handleClientInput={props.handleClientInput}
      selectedServices={props.selectedServices}
    />
  });

  return (
    <div>
      <h3>Select A Service</h3>
      {serviceList}
    </div>
  )
}

export default serviceList;