import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { getEvents } from './lib.js'
BigCalendar.momentLocalizer(moment)

require('react-big-calendar/lib/css/react-big-calendar.css')

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: []
     }
  }
  componentDidMount() {
    getEvents().then(events => {
      this.setState({events})
    })
  }
  handleClick = () => {
    this.props.handleClientInput({
      packageType: 'calendar',
      data: 'blah'
    })
  }
  handleSlotSelect = (slotInfo) => {
    console.log(slotInfo)
    this.setState({events: [...this.state.events, {
      start: slotInfo.start,
      end: slotInfo.end,
      title: this.props.appointmentData.title
    }]})
  }
  handleEventSelect = (eventInfo) => {
    console.log(eventInfo)
  }
  render() { 
    return (
      <div>
        <button onClick={this.handleClick}>Go</button>
        <BigCalendar 
          style={{height: '420px'}}
          step={this.props.calendarData.gridSmall}
          timeslots={this.props.calendarData.gridLarge / this.props.calendarData.gridSmall}
          events={this.state.events}
          defaultDate={new Date()}
          defaultView='week'
          drilldownView="agenda"
          scrollToTime={new Date()} 
          selectable={"ignoreEvents"}
          onSelectSlot={this.handleSlotSelect}
          onSelectEvent={this.handleEventSelect}
          />
      </div>
     )
  }
}
 
export default Calendar;