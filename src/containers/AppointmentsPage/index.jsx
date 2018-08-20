import React, { Component } from 'react';
import '../../styles/App.css';
import AppointmentsForm from '../../components/AppointmentForm';
import AppointmentsTable from '../../components/AppointmentsTable';

class AppointmentsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
    }
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    fetch('http://localhost:8000/appointments')
        .then(results => results.json())
        .then(results => {
          console.log(results)
        })
        .catch(e => {
          console.log(e);
        })
  }

  render() {
    return (
      <div className="appointments-page">
        <header className="appointments-page__header">
          <h1>Appointments</h1>
        </header>
        <AppointmentsForm />
        <AppointmentsTable appointments={this.state.appointments} />
      </div>
    );
  }
}

export default AppointmentsPage;
