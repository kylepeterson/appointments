import React from 'react';
import AppointmentTable from './../components/AppointmentsTable';
import AppointmentRow from './../components/AppointmentRow';
import { shallow } from 'enzyme';

it('renders correct amount of Appointment Rows', () => {
  const wrapper = shallow(
      <AppointmentTable
          appointments={[{}, {}, {}]}
      />
  );
  const rows = wrapper.find(AppointmentRow);

  expect(rows.length).toEqual(3);
});
