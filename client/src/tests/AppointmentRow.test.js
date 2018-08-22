import React from 'react';
import AppointmentRow from './../components/AppointmentRow';
import { shallow } from 'enzyme';

it('renders correct dates in correct format', () => {
  const wrapper = shallow(
      <AppointmentRow
          startDate={new Date(2018, 7, 25, 6)}
          service={{name: "test", length: "120"}}
      />
  );
  const startDate = wrapper.find('.appointment-row__start-date');
  const endDate = wrapper.find('.appointment-row__end-date');

  expect(startDate).toHaveText("Start Date: August 25th 2018, 6:00 am");
  expect(endDate).toHaveText("End Date: August 25th 2018, 8:00 am");
});
