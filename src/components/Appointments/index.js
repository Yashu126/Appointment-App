import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', fav: false}

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStared: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
    console.log(event.target.value)
  }

  onStared = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStared: !each.isStared}
        }
        return {each}
      }),
    }))
  }

  onlyFav = () => {
    this.setState(prevState => ({fav: !prevState.fav}))
  }

  render() {
    const {appointmentList, title, date, fav} = this.state

    const favBtn = fav ? 'stared' : 'unstared'

    const resultList = fav
      ? appointmentList.filter(each => each.isStared === true)
      : appointmentList

    return (
      <div className="background-con">
        <div className="card-con">
          <div className="form-con">
            <form>
              <h1>Add Appointment</h1>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                onChange={this.onTitleChange}
                value={title}
                className="input-el"
                type="text"
                placeholder="Title"
              />
              <br />
              <label htmlFor="date">Date</label>
              <br />
              <input
                id="date"
                onChange={this.onDateChange}
                value={date}
                className="input-el"
                type="date"
              />
              <br />
              <button
                type="button"
                onClick={this.addAppointment}
                className="add-btn"
              >
                Add
              </button>
            </form>
            <img
              className="appointment-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="head-btn-con">
            <h1 className="appointment-heading">Appointments</h1>
            <div>
              <button onClick={this.onlyFav} type="button" className={favBtn}>
                Starred
              </button>
            </div>
          </div>
          <ul>
            {resultList.map(eachAppointment => (
              <AppointmentItem
                onStared={this.onStared}
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
