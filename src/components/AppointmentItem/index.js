import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onStared} = props
  const {title, date, isStared, id} = eachAppointment

  const onToggleStar = () => {
    onStared(id)
  }

  const star = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-card">
      <div className="title-con">
        <p className="title">{title}</p>
        <button
          data-testid="star"
          className="star-btn"
          onClick={onToggleStar}
          type="button"
        >
          <img src={star} alt="start" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
