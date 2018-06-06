import axios from 'axios'
import { API_KEY, CALENDAR_ID } from '../../../calendar_secrets.json'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

// https://blog.daftcode.pl/react-calendar-with-google-calendar-as-cms-tutorial-5f5d81e425a9

let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents() {
  return axios.get(url)
    .then(res => {
      let events = []
      res.data.items.forEach(event => {
        events.push({
          start: event.start.date || new Date(event.start.dateTime),
          end: event.end.date || new Date(event.end.dateTime),
          title: "Booked",
          booked: true
        })
      })
      return events
    })
    .catch(err => {
      console.error(err)
    })
}

// Calculate an end-time given start-time and duration
export function getEndTime(startTime, durationMin) {
  return new Date(startTime.getTime() + (durationMin * 60 * 1000))
}

export function checkEventOverlap(a, b) {
  const rangeA = moment.range(a.start, a.end)
  const rangeB = moment.range(b.start, b.end)
  return rangeA.overlaps(rangeB)
}

export function totalAppointmentTime(services) {
  return services.reduce((total, service) => { return total + service.durationMin}, 0)
}

export function generateAppointmentName(services) {
  return services.map(services => services.description).join(', ')
}

export function checkBusinessClosed(slotDateTime, businessHours) {
  const slotDayOfWeek = slotDateTime.getDay()
  const slotHour = slotDateTime.getHours()

  if (slotHour >= businessHours[slotDayOfWeek].closing || slotHour < businessHours[slotDayOfWeek].opening) {
    return true
  } else {
    return false
  }
}

// Reformat opening/closing hours str->num for faster comparisons
// Eg. "09:00" --> 9
// Note: only supports whole number hours (eg. cannot do 09:30)
export function formatBusinessHours(hours) {
  return hours.map(day => {
    return {
      opening: Number(day.opening.substr(0,2)),
      closing: Number(day.closing.substr(0,2))
    }
  })
}