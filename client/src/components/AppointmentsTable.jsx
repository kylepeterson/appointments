import React from 'react';
import PropTypes from 'prop-types';
import AppointmentRow from './AppointmentRow';

const propTypes = {
  appointments: PropTypes.array,
  onDeleteAppointment: PropTypes.func,
};

const defaultProps = {
  appointments: [],
};

const AppointmentsTable = ((props) => {
  const renderTableRows = () => {
    return props.appointments.map((appointment) => {
      return (
          <AppointmentRow
              id={appointment._id}
              {...appointment}
              onDelete={props.onDeleteAppointment}
              key={appointment._id}
          />
      )
    })
  };

  return (
      <div className="appointments-table">
        {renderTableRows()}
      </div>
  );
});

AppointmentsTable.propTypes = propTypes;
AppointmentsTable.defaultProps = defaultProps;

export default AppointmentsTable;
