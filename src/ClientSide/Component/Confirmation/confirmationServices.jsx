import React from 'react';


const ConfirmationServices = ({ service }) => {
  return (
    <div>
      <span>{service.description}</span>
      <span>{service.priceCents}</span>
      <span>{service.durationMin}</span>
    </div>
  )
}

export default ConfirmationServices;