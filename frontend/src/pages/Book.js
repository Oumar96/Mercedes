import React, { Component } from 'react';
import AppointmentApp from '../components/AppointmentApp';

import './Book.css';

class BookPage extends Component {

  render() {
    return (
      <React.Fragment>
      <img class="image" src="https://www.sleeptmj.com/wp-content/uploads/2017/10/FAQs1.jpg" alt="clinic" />
      <AppointmentApp></AppointmentApp>
      </React.Fragment>
    );
  }
}

export default BookPage;