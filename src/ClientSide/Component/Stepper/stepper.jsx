import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


//imported components
import UserInfo from '../UserInfo/userInfo.jsx';
import ServiceList from '../ServiceList/serviceList.jsx';
import Calendar from '../Calendar'
import Confirmation from '../Confirmation'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Select Service', 'Book Appointment', 'Your Information', 'Confirmation'];
}

//this is where your components will go
function getStepContent(step, services, business, client, handleClientInput, selectedServices, selectedAppointment) {
  switch (step) {
    case 0:
      return (
        <div>
          <ServiceList
            services={business.services}
            handleClientInput={handleClientInput}
          />
          Select a service
        </div>
      )
    case 1:
      return (
        <Calendar
          handleClientInput={handleClientInput}
          selectedServices={selectedServices}
          /* TODO: pass the calendar's data here */
          calendarData={{
            gridSmall: 15,
            gridLarge: 60,
            maxConcurrentAppointments: 2
          }}
        />)
    case 2:
      return (
          <div>
            <UserInfo
            clientInfo={client}
            handleClientInput={handleClientInput}/>
            Contact Information
          </div>
        )
    case 3:
      return (
        <div>
          <Confirmation />
        </div>
      )
    default:
      return 'Unknown step';
  }
}

class HorizontalLinearStepper extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};

            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
                {this.props.services}
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              {/* the getStepContent function is where you place your components */}
              {/* pass any info from app as a aurgument*/}
              <div
                className={classes.instructions}>
                  {getStepContent(activeStep,
                    this.props.services,
                    this.props.business,
                    this.props.client,
                    this.props.handleClientInput,
                    this.props.selectedServices,
                    this.props.selectedAppointment
                  )}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="flat"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLinearStepper);