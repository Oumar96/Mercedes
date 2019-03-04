import React from 'react';

import './AppointmentItem.css';

const appointmentItem = props => (
  <li key={props.appointmentId} className="appointments__list-item">
    <div>
      <h1>{props._id}</h1>
      <h2>
        {props.type}
      </h2>
    </div>
    <div>
      <button className="btn" onClick={props.onDetail.bind(this, props.appointmentId)}>
        View Details
      </button>
    </div>
  </li>
);

export default appointmentItem;
