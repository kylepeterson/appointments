import React, { Component } from 'react';
import Select from 'react-select';

class AppointmentsForm extends Component {
  render() {
    return (
      <div className="appointments-form">
        <Select
            value={"1"}
            options={[
              { value: '1', label: 'Kyle Peterson' },
              { value: '2', label: 'Doug Man' },
              { value: '3', label: 'Karen Woman' }
            ]}
        />
        <Select
            value={"1"}
        />
        <Select
            value={"1"}
        />
        <Select
            value={"9"}
        />
      </div>
    );
  }
}

export default AppointmentsForm;
