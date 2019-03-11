import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import AppointmentsPage from './pages/Appointments';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import BookPage from './pages/Book';
import DoctorPage from './pages/Doctor';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
        <div>
          <BrowserRouter>
            <React.Fragment>
              <AuthContext.Provider
                  value={{
                    token: this.state.token,
                    userId: this.state.userId,
                    login: this.login,
                    logout: this.logout
                  }}
              >
                <MainNavigation />
                <main className="main-content">
                  <Switch>
                    {!this.state.token && <Redirect from="/" to="/book" exact />}
                    {this.state.token && <Redirect from="/" to="/events" exact />}
                    {this.state.token && (
                        <Redirect from="/auth" to="/events" exact />
                    )}
                    {!this.state.token && (
                        <Route path="/auth" component={AuthPage} />
                    )}
                    <Route path="/events" component={AppointmentsPage} />
                    <Route path="/book" component={BookPage} />
                    <Route path="/schedule" component={DoctorPage} />
                  </Switch>
                </main>
              </AuthContext.Provider>
            </React.Fragment>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;