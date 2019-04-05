import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <h1>Uber Santé</h1>
            </NavLink>
          </div>
          <nav className="main-navigation__items">
            <ul>
              <li>
                <NavLink to="/book">Book</NavLink>
              </li>
              <li>
                <NavLink to="/events">Search Appointments</NavLink>
              </li>
              {!context.token && (
                <li>
                  <NavLink to="/schedule">Doctor Schedule</NavLink>
                </li>
              )}
              {!context.token && (
                <li>
                  <NavLink to="/auth">Nurse Login</NavLink>
                </li>
              )}
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/book" onClick={context.logout}>
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
