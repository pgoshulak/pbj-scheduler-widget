import axios from 'axios'
import { API_KEY, CALENDAR_ID } from '../../../calendar_secrets.json'

// https://blog.daftcode.pl/react-calendar-with-google-calendar-as-cms-tutorial-5f5d81e425a9

let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents() {
  return axios.get(url)
    .then(res => {
      let events = []
      res.data.items.map(event => {
        events.push({
          start: event.start.date || new Date(event.start.dateTime),
          end: event.end.date || new Date(event.end.dateTime),
          title: "Booked"
        })
      })
      return events
    })
    .catch(err => {
      console.error(err)
    })
}