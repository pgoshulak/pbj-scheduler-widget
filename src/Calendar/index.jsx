import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { getEvents } from '../lib/getEvents.js'
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
  render() { 
    return (
      <div>
        <BigCalendar 
          style={{height: '420px'}}
          events={this.state.events} />
      </div>
     )
  }
}
 
export default Calendar;