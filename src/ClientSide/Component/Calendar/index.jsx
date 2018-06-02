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
    this.setState({ newEvent: {
      start: startTime,
      end: getEndTime(startTime, this.props.appointmentData.durationMin),
      title: this.props.appointmentData.title
    }})
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
          />
      </div>
     )
  }
}
 
export default Calendar;