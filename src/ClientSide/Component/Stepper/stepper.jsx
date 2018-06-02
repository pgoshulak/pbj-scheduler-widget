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
function getStepContent(step, services, handleClientInput) {
  switch (step) {
    case 0:
      return (
        <div>
          <ServiceList
            services={services.services}
            handleClientInput={handleClientInput}
          />
          Select a service
        </div>
      )
    case 1:
      return (
        <Calendar
          handleClientInput={handleClientInput}
          /* TODO: pass the appointment data here */
          appointmentData={{
            durationMin: 45,
            title: "Haircut and Wash"
          }}
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
            handleClientInput={handleClientInput}/>
            Contact Information
          </div>
        )
    case 3:
      return 'This is right?';
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

  isStepOptional = step => {
    return step === null;
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
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

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const skipped = new Set(this.state.skipped.values());
    skipped.add(activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped,
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
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
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
              {/* this is where you past the services to the service component */}
              <div
                className={classes.instructions}>
                  {getStepContent(activeStep,
                    this.props.services,
                    this.props.handleClientInput
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
              {/*I don't think you need this, its for optional steps, remove from template*/}
              {/*
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
              */}
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