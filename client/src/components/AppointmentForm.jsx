import React, { Component } from 'react';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import PropTypes from 'prop-types';

const propTypes = {
  customer: PropTypes.string,
  resource: PropTypes.string,
  service: PropTypes.string,
  startDate: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

const defaultProps = {

};

class AppointmentsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      resources: [],
      services: [],
      selected: {
        customer: null,
        resource: null,
        service: null,
        startDate: null,
      }
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.fetchResources();
    this.fetchCustomers();
    this.fetchServices();
  }

  fetchCustomers() {
    fetch('/customers')
        .then(customers => customers.json())
        .then(customers => {
          this.setState(() => {
            return {
              customers: customers.sort((a, b) =>  a.lastName.localeCompare(b.lastName)),
            }
          })
        })
  }

  fetchResources() {
    fetch('/resources')
        .then(resources => resources.json())
        .then(resources => {
          this.setState(() => {
            return {
              resources: resources.sort((a, b) => a.name.localeCompare(b.name)),
            }
          })
        })
  }

  fetchServices() {
    fetch('/services')
        .then(services => services.json())
        .then(services => {
          this.setState(() => {
            return {
              services: services.sort((a, b) => a.length - b.length),
            }
          })
        })
  }

  handleSelectChange(type, result) {
    this.setState((prevState) => {
      return {
        selected: { ...prevState.selected, [type]: result }
      }
    })
  }

  handleSubmit() {
    const appointment = this.state.selected;
    if (Object.values(appointment).filter((field) => field === null).length === 0) {
      this.props.onSubmit(appointment);
    }
  }

  render() {
    const customers = this.state.customers && this.state.customers.map((customer) => {
      return { ...customer, id: customer._id, label: `${customer.firstName} ${customer.lastName}`   }
    });

    const resources = this.state.resources && this.state.resources.map((resource) => {
      return { ...resource, id: resource._id, label: resource.name }
    });

    const services = this.state.services && this.state.services.map((service) => {
      return { ...service, id: service._id, label: `${service.name} (${service.length} min)` };
    });

    const selected = this.state.selected;
    return (
      <div className="appointments-form">
        <Select
            placeholder="Customer"
            className="appointments-form__select"
            value={selected.customer}
            options={customers}
            onChange={(e) => this.handleSelectChange('customer', e)}
        />
        <Select
            placeholder="Service"
            className="appointments-form__select"
            value={selected.service}
            options={services}
            onChange={(e) => this.handleSelectChange('service', e)}
        />
        <Select
            placeholder="Employee"
            className="appointments-form__select"
            value={selected.resource}
            options={resources}
            onChange={(e) => this.handleSelectChange('resource', e  )}
        />
        <DateTimePicker
            className="appointments-form__date-time"
            value={selected.startDate}
            onChange={(e) => this.handleSelectChange('startDate', e)}
            disableClock
        />
        <div>
          <button
              className="appointments-page__button"
              onClick={this.handleSubmit}>
            Submit Appointment
          </button>
          <button
              className="appointments-page__button"
              onClick={this.props.onClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

AppointmentsForm.propTypes = propTypes;
AppointmentsForm.defaultProps = defaultProps;

export default AppointmentsForm;
