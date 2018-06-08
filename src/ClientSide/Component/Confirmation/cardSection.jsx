import React from 'react';
import {CardElement} from 'react-stripe-elements';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {

  },
  card: {
  },
  detail: {
    textAlign: 'left',
    color: '#919fb4'
  },
  border: {
    padding: '14px;',
    backgroundColor: 'white',
    borderRadius: '5px'
  }
});

class CardSection extends React.Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <label>
          <div className={classes.detail}>Card details</div>
            <div className={classes.border}>
              <CardElement className={classes.card} style={{base: {fontSize: '18px'}}} />
            </div>
        </label>
      </div>
    );
  }
};

CardSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardSection);
