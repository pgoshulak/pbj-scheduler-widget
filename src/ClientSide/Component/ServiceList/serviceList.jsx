import React from 'react';
import Service from '../Services/service.jsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select Service</TableCell>
            <TableCell numeric>Service</TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell numeric>Duration</TableCell>
          </TableRow>
        </TableHead>
            {serviceList}
      </Table>
    </div>
  )
}

export default serviceList;