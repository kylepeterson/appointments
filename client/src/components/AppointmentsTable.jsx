import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppointmentRow from './AppointmentRow';

const propTypes = {
  appointments: PropTypes.array,
  onDeleteAppointment: PropTypes.func,
};

const defaultProps = {
  appointments: [],
};

class AppointmentsTable extends Component {

  renderTableRows() {
   return this.props.appointments.map((appointment) => {
     return (
         <AppointmentRow
             key={appointment._id}
             id={appointment._id}
             {...appointment}
             onDelete={this.props.onDeleteAppointment}
         />
     )
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

AppointmentsTable.propTypes = propTypes;
AppointmentsTable.defaultProps = defaultProps;

export default AppointmentsTable;
