import React, { Component } from 'react';

import './Administrator.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value.toUpperCase();
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    }

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <img
          class="image"
          src="https://cdn.roschier.com/cdn/farfuture/pcgwdi0bDa-FRQVEnPjfeqhmWNGenZSCKUThq4Ww1Ko/mtime:1536426781/sites/default/files/styles/hero_without_side_bar/public/hero_ict_0.jpg?itok=vO8TigBZ"
          alt="clinic"
        />
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div class="input-group mb-3">
            <input
              type="text"
              pattern="[a-zA-Z]{3}\d{5}"
              class="form-control"
              ref={this.emailEl}
              placeholder="Administrator ID"
              aria-label="Access ID"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              ref={this.passwordEl}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
        <br />
        <br />
        <br />
        <br />
        {this.context.token && <p> Hello ! </p>}
      </React.Fragment>
    );
  }
}

export default AuthPage;
