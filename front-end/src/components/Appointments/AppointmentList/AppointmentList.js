import React from 'react';

import AppointmentItem from './AppointmentItem/AppointmentItem';
import './AppointmentList.css';

const appointmentList = props => {
  const appointments = props.appointments.map(appointment => {
    return (
      <AppointmentItem
        key={appointment._id}
        appointmentId={appointment._id}
        type={appointment.type}
        onDetail={props.onViewDetail}
        onDelete={props.onCancel}
      />
    );
  });

  return <ul className="appointment__list">{appointments}</ul>;
};

export default appointmentList;
