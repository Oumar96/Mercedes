import React, { Component } from 'react';
import AppointmentApp from '../components/DoctorScheduleAppointmentApp';


class DoctorPage extends Component {

  render() {
    return (
        <React.Fragment>
          <img class="image" src="https://tauglobal.com/wp-content/uploads/2018/05/doctors-and-densist.png" alt="clinic" />
          <AppointmentApp></AppointmentApp>
        </React.Fragment>
    );
  }
}

export default DoctorPage;
