import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import AppointmentRow from './AppointmentRow';

const propTypes = {
  appointments: PropTypes.array,
};

const defaultProps = {
  appointments: [],
};

class AppointmentsForm extends Component {

  renderTableRows() {
   this.props.appointments.map((appointment) => {
     return <AppointmentRow />
   })
  }

  render() {
    return (
      <div className="appointments-table">
        {this.renderTableRows()}
      </div>
    );
  }
}

AppointmentsForm.propTypes = propTypes;
AppointmentsForm.defaultProps = defaultProps;

export default AppointmentsForm;
