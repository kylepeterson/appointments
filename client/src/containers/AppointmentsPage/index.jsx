import React, { Component } from 'react';
import '../../styles/App.css';
import AppointmentsForm from '../../components/AppointmentForm';
import AppointmentsTable from '../../components/AppointmentsTable';

class AppointmentsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      appointmentFormVisible: false,
    };

    this.handleToggleForm = this.handleToggleForm.bind(this);
    this.handleSubmitNewAppointment = this.handleSubmitNewAppointment.bind(this);
    this.handleDeleteAppointment = this.handleDeleteAppointment.bind(this);
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    fetch('/appointments')
        .then(data => data.json())
        .then(data => {
          const appointments = data.map((a) => ({ ...a, startDate: new Date(a.startDate) }));
          const sorted = appointments.sort((a, b) => a.startDate - b.startDate);
          this.setState(() => ({ appointments: sorted }));
        });
  }

  handleToggleForm() {
    this.setState((prevState) => ({ appointmentFormVisible: !prevState.appointmentFormVisible }));
  }

  handleSubmitNewAppointment(appointment) {
    fetch('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
      headers: {"Content-Type": "application/json"}
    })
        .then(() => this.fetchAppointments())
        .then(() => this.setState(() => ({ appointmentFormVisible: false })));
  }

  handleDeleteAppointment(id) {
    fetch(`/appointments/${id}`, {
      method: 'DELETE',
    }).then(() => this.fetchAppointments());
  }

  renderNewAppointmentSection() {
    return (
        this.state.appointmentFormVisible ?
            <AppointmentsForm
                onSubmit={this.handleSubmitNewAppointment}
                onClose={this.handleToggleForm}
            /> :
            <button className="appointments-page__button" onClick={this.handleToggleForm}>
              Add Appointment
            </button>
    )
  }

  render() {
    return (
      <div className="appointments-page">
        <header className="appointments-page__header">
          <h1>Appointments</h1>
        </header>
        {this.renderNewAppointmentSection()}
        <AppointmentsTable
            appointments={this.state.appointments}
            onDeleteAppointment={this.handleDeleteAppointment}
        />
      </div>
    );
  }
}

export default AppointmentsPage;
