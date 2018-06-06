import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { 
  getEvents,
  getEndTime,
  checkEventOverlap,
  totalAppointmentTime,
  generateAppointmentName,
  checkBusinessClosed
} from './lib.js'
BigCalendar.momentLocalizer(moment)

require('react-big-calendar/lib/css/react-big-calendar.css')

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      existingEvents: [],
      newEvent: {},
      appointmentTime: totalAppointmentTime(this.props.selectedServices),
      appointmentName: generateAppointmentName(this.props.selectedServices),

      // Note: react-big-calendar has confusing nomenclature for the following variables:
      //   "step" = smallest resolution timeslot, in minutes (aka "minor grid lines")
      //   "timeslots" = number of "steps" per major division (aka "major grid lines")
      // Eg: step=15, timeslots=4 ==> minor gridlines at 15 min, major gridlines at 60 min
      // It's clearer to store these "major/minor gridlines" and calculate step/timeslots here instead
      calendarGrid: {
        step: this.props.business.calendarData.gridSmall,
        timeslots: this.props.business.calendarData.gridLarge / this.props.business.calendarData.gridSmall
      }
     }
  }
  componentDidMount() {
    this.setState({newEvent: this.props.selectedAppointment})
    getEvents().then(events => {
      this.setState({existingEvents: events})
    })
  }
  createAppointment = (startTime) => {
    // Generate new event
    const newEvent = {
      start: startTime,
      end: getEndTime(startTime, this.state.appointmentTime),
      title: this.state.appointmentName,
      valid: true
    }

    // Check if business is closed while event requested
    // FIXME: prevents event from being booked within one 'slot' of closing hour
    if (checkBusinessClosed(newEvent.start) || checkBusinessClosed(newEvent.end)) {
      newEvent.valid = false

    // Check if the event has too many overlaps
    } else if (this.overlappingEvents(newEvent) + 1 > this.props.business.calendarData.maxConcurrentAppointments) {
      newEvent.valid = false
    }
    // Create event on current <Calendar/> display
    this.setState({ newEvent })
    // Send event to parent data handler
    this.props.handleClientInput({
      packageType: 'calendar',
      packageData: newEvent
    })
  }
  handleSlotSelect = (slotInfo) => {
    this.createAppointment(slotInfo.start)
  }
  handleEventSelect = (eventInfo) => {
    console.log(eventInfo)
  }
  onSelecting = (selectInfo) => {
    this.createAppointment(selectInfo.end)
    // Return 'false' to prevent default 'select time box' behaviour
    return false
  }
  // Get number of overlapping events (may create performance issues with many events?)
  overlappingEvents = (thisEvent) => {
    return this.state.existingEvents.reduce((overlaps, existingEvent) => {
      return checkEventOverlap(thisEvent, existingEvent) ? overlaps + 1 : overlaps
    }, 0)
  }
  
  // Customize the event cell styling
  eventPropGetter = (event) => {
    const style = {
      backgroundColor: '#4caf50',
      border: '1px solid #327435'
    }
    if (event.valid === false) {
      style.backgroundColor = '#ea1c0d'
      style.border = '1px solid #ba160a'
    } else if (event.booked === true) {
      style.backgroundColor = 'grey'
      style.border = '1px solid darkgrey'
    }
    return { style }
  }

  // CUstom slot styling
  slotPropGetter = (slotDateTime) => {
    const timeOffStyle = {
      backgroundColor: '#eee',
      border: '1px solid #eee'
    }
    if (checkBusinessClosed(slotDateTime)) {
      return { style: timeOffStyle }
    } else {
      return null
    }
  }

  render() { 
    return (
      <div>
        <BigCalendar 
          style={{height: '420px'}}
          step={this.state.calendarGrid.step}
          timeslots={this.state.calendarGrid.timeslots}
          events={[...this.state.existingEvents, this.state.newEvent]}
          defaultDate={new Date()}
          defaultView='week'
          drilldownView="agenda"
          scrollToTime={new Date('Jan 1 1970, 9:00:00')} 
          selectable={"ignoreEvents"}
          onSelectSlot={this.handleSlotSelect}
          onSelectEvent={this.handleEventSelect}
          onSelecting={this.onSelecting}
          eventPropGetter={this.eventPropGetter}
          slotPropGetter={this.slotPropGetter}
          />
      </div>
     )
  }
}
 
export default Calendar;