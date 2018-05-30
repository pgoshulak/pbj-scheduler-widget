import axios from 'axios'
import { API_KEY, CALENDAR_ID } from '../calendar_secrets.json'

// https://blog.daftcode.pl/react-calendar-with-google-calendar-as-cms-tutorial-5f5d81e425a9

let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents() {
  return axios.get(url)
    .then(res => {
      let events = []
      console.log(res)
      res.data.items.map(event => {
        events.push({
          start: event.start.date || event.start.dateTime,
          end: event.end.date || event.end.dateTime,
          title: event.summary
        })
      })
      return events
    })
    .catch(err => {
      console.error(err)
    })
}