import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes } = props;

  return (
        <TableBody>
          <TableRow key={props.service.billingCode}>
            <TableCell component="th" scope="row">
              {props.service.description}
            </TableCell>
            <TableCell numeric>{props.service.durationMin}</TableCell>
            <TableCell numeric>${(props.service.priceCents/100).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);