import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { getEvents, getEndTime } from './lib.js'
BigCalendar.momentLocalizer(moment)

require('react-big-calendar/lib/css/react-big-calendar.css')

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      existingEvents: [],
      newEvent: {},
     }
  }
  componentDidMount() {
    getEvents().then(events => {
      this.setState({existingEvents: events})
    })
  }
  handleClick = () => {
    this.props.handleClientInput({
      packageType: 'calendar',
      data: 'blah'
    })
  }
  createAppointment = (startTime) => {
    // Generate new event
    const newEvent = {
      start: startTime,
      end: getEndTime(startTime, this.props.appointmentData.durationMin),
      title: this.props.appointmentData.title
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
  // Customize the event cell styling
  eventPropGetter = (event) => {
    const style = {
      backgroundColor: '#4caf50',
      border: '1px solid #327435'
    }
    if (event.booked == true) {
      style.backgroundColor = 'grey'
      style.borderColor = 'darkgrey'
    }
    return { style }
  }
  render() { 
    return (
      <div>
        <button onClick={this.handleClick}>Go</button>
        <BigCalendar 
          style={{height: '420px'}}
          step={this.props.calendarData.gridSmall}
          timeslots={this.props.calendarData.gridLarge / this.props.calendarData.gridSmall}
          events={[...this.state.existingEvents, this.state.newEvent]}
          defaultDate={new Date()}
          defaultView='week'
          drilldownView="agenda"
          scrollToTime={new Date()} 
          selectable={"ignoreEvents"}
          onSelectSlot={this.handleSlotSelect}
          onSelectEvent={this.handleEventSelect}
          onSelecting={this.onSelecting}
          eventPropGetter={this.eventPropGetter}
          />
      </div>
     )
  }
}
 
export default Calendar;