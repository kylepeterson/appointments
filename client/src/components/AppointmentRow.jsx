import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  id: PropTypes.string,
  customer: PropTypes.object,
  resource: PropTypes.object,
  service: PropTypes.object,
  startDate: PropTypes.object,
  onDelete: PropTypes.func,
};

const defaultProps = {
  id: null,
  customer: { id: '', label: '' },
  resource: { id: '', label: '' },
  service: { id: '', label: '' },
  startDate: null,
};

const AppointmentRow = ((props) => {
  const getStartDate = () => {
    return getFormattedDate(moment(props.startDate));
  };

  const getEndDate = () => {
    const endDate = moment(props.startDate).add(props.service.length, 'm');
    return getFormattedDate(endDate)
  };

  const getFormattedDate = (dateMoment) => {
    return dateMoment.format("MMMM Do YYYY, h:mm a");
  };

  return (
      <div className="appointment-row">
        <div className="appointment-row__details">
          <div className="appointment-row__customer">
            <span>Customer: </span>
            { props.customer && props.customer.label }
          </div>
          <div className="appointment-row__resource">
            <span>Resource: </span>
            {props.resource && props.resource.label}
          </div>
          <div className="appointment-row__service">
            <span>Service: </span>
            {props.service && props.service.label}
          </div>
          <div className="appointment-row__start-date">
            <span>Start Date: </span>
            {props.startDate && getStartDate()}
          </div>
          <div className="appointment-row__end-date">
            <span>End Date: </span>
            {props.startDate && props.service && getEndDate()}
          </div>
        </div>
        <div onClick={() => props.onDelete(props.id)} className="appointment-row__delete">
          Delete
        </div>
      </div>
  );
});

AppointmentRow.propTypes = propTypes;
AppointmentRow.defaultProps = defaultProps;

export default AppointmentRow;
