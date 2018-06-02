import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
import { getEvents } from './getEvents.js'
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
  render() { 
    return (
      <div>
        <button onClick={this.handleClick}>Go</button>
        <BigCalendar 
          style={{height: '420px'}}
          events={this.state.events}
          defaultDate={new Date()}
          defaultView='week'
          drilldownView="agenda"

          scrollToTime={new Date()} />
      </div>
     )
  }
}
 
export default Calendar;