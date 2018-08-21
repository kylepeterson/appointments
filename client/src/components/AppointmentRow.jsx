import React, { Component } from 'react';
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

class AppointmentRow extends Component {
  getStartDate() {
    return this.getFormattedDate(moment(this.props.startDate));
  }

  getEndDate() {
    const endDate = moment(this.props.startDate).add(this.props.service.length, 'm');
    return this.getFormattedDate(endDate)
  }

  getFormattedDate(dateMoment) {
    return dateMoment.format("MMMM Do YYYY, h:mm a");
  }
  render() {
    return (
      <div className="appointment-row">
        <div className="appointment-row__details">
          <div className="appoint-row__customer">
            <span>Customer: </span>
            { this.props.customer && this.props.customer.label }
          </div>
          <div className="appoint-row__resource">
            <span>Resource: </span>
            {this.props.resource && this.props.resource.label}
          </div>
          <div className="appoint-row__service">
            <span>Service: </span>
            {this.props.service && this.props.service.label}
          </div>
          <div className="appoint-row__start-date">
            <span>Start Date: </span>
            {this.props.startDate && this.getStartDate()}
          </div>
          <div className="appoint-row__end-date">
            <span>End Date: </span>
            {this.props.startDate && this.props.service && this.getEndDate()}
          </div>
        </div>
        <div onClick={() => this.props.onDelete(this.props.id)} className="appointment-row__delete">
          Delete
        </div>
      </div>
    );
  }
}

AppointmentRow.propTypes = propTypes;
AppointmentRow.defaultProps = defaultProps;

export default AppointmentRow;
