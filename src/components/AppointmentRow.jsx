import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const propTypes = {
  customer: PropTypes.string,
  resource: PropTypes.string,
  service: PropTypes.string,
  startTime: PropTypes.string,
};

const defaultProps = {

};

class AppointmentRow extends Component {

  render() {
    return (
      <div className="appointment-row">
        <div className="appoint-row__customer">
          Customer: {this.props.customer}
        </div>
        <div className="appoint-row__resource">
          Resource: {this.props.resource}
        </div>
        <div className="appoint-row__service">
          Service: {this.props.service}
        </div>
        <div className="appoint-row__startTime">
          Start Time: {this.props.startTime}
        </div>
      </div>
    );
  }
}

AppointmentRow.propTypes = propTypes;
AppointmentRow.defaultProps = defaultProps;

export default AppointmentRow;
