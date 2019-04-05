import React, { Component } from 'react';

import './AdminPanel.css';
import AuthContext from '../context/auth-context';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Spinner from '../components/Spinner/Spinner';

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class AdminPanel extends Component {
  state = {
    clinicName: '',
    clinicAddress: '',
    clinicRooms: 0,
    isLoading: false,
    type: '',
    hcn: '',
    permitNumber: '',
    accessId: ''
  };
  isActive = true;

  static contextType = AuthContext;

  componentWillUnmount() {
    this.isActive = false;
  }

  createClinicHandler = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation CreateClinic($name: String!, $address: String!, $rooms: Int!) {
            createClinic(name: $name, location: $address, rooms: $rooms) {
              name
            }
          }
        `,
      variables: {
        name: this.state.clinicName,
        address: this.state.clinicAddress,
        rooms: Number(this.state.clinicRooms)
      }
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          alert('Woops, something went wrong!');
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        alert('Clinic successfuly added!');
        this.setState(prevState => {
          return { isLoading: false };
        });
      })
      .catch(err => {
        alert('Woops, something went wrong!');
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  pushPersonHandler = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation PushPerson($name: String!, $type: String!, $permitNumber: Int, $accessId: String, $hcn: String) {
            pushPerson(name: $name, type: $type, permitNumber: $permitNumber, accessId: $accessId, hcn: $hcn)
          }
        `,
      variables: {
        name: this.state.clinicName,
        type: this.state.type,
        permitNumber: Number(this.state.permitNumber),
        accessId: this.state.accessId,
        hcn: this.state.hcn
      }
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          alert('Woops, something went wrong!');
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        alert('Person successfuly added to clinic!');
        this.setState(prevState => {
          return { isLoading: false };
        });
      })
      .catch(err => {
        alert('Woops, something went wrong!');
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  handleSetName(name) {
    this.setState({ clinicName: name });
  }

  handleSetAddress(address) {
    this.setState({ clinicAddress: address });
  }

  handleSetRooms(rooms) {
    this.setState({ clinicRooms: rooms });
  }

  handleSetType(type) {
    this.setState({ type: type });
  }

  handleSetIdentifier(identifier) {
    this.setState({ hcn: identifier });
    this.setState({ permitNumber: identifier });
    this.setState({ accessId: identifier });
  }

  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider>
          <div>
            <img
              class="image"
              src="https://www.adroitinfosystems.com/images/siteimages/pages/finalImgforpages/eclinicsystems-banner.jpg"
              alt="clinic"
            />
            <br />
            <h1>Add a Clinic</h1>
            <br />
            <div class="grid">
              <div class="depth2">
                <p>Name:</p>
                <TextField
                  hintText="Clinic Plein Ciel"
                  onChange={(evt, newValue) => {
                    this.handleSetName(newValue);
                  }}
                />
              </div>
              <div class="depth2">
                <p>Address:</p>
                <TextField
                  hintText="1234 Main St"
                  onChange={(evt, newValue) => {
                    this.handleSetAddress(newValue);
                  }}
                />
              </div>
              <div class="depth2">
                <p>Number of rooms:</p>
                <TextField
                  hintText="1, 2, 3, etc"
                  onChange={(evt, newValue) => {
                    this.handleSetRooms(newValue);
                  }}
                />
              </div>
              {this.state.isLoading ? (
                <Spinner />
              ) : (
                  <div class="depth2">
                    <RaisedButton
                      primary={true}
                      label="Add"
                      onClick={this.createClinicHandler}
                    />
                  </div>
                )}
            </div>
            <br />
            <h1>Push a person to an existing clinic</h1>
            <br />
            <div class="grid">
              <div class="depth2">
                <p>Clinic Name:</p>
                <TextField
                  hintText="Clinic Plein Ciel"
                  onChange={(evt, newValue) => {
                    this.handleSetName(newValue);
                  }}
                />
              </div>
              <div class="depth2">
                <p>Type:</p>
                <SelectField
                  floatingLabelText="Type"
                  value={this.state.type}
                  onChange={(evt, key, newValue) =>
                    this.handleSetType(newValue)
                  }
                >
                  <MenuItem value={"Doctor"} primaryText="Doctor" />
                  <MenuItem value={"Nurse"} primaryText="Nurse" />
                  <MenuItem value={"Patient"} primaryText="Patient" />
                </SelectField>
              </div>
              <div class="depth2">
                <p>Identifier:</p>
                <TextField
                  hintText="HCN, Permit Number, ..."
                  onChange={(evt, newValue) => {
                    this.handleSetIdentifier(newValue.replace(/\s/g, ''));
                  }}
                />
              </div>
              {this.state.isLoading ? (
                <Spinner />
              ) : (
                  <div class="depth2">
                    <RaisedButton
                      primary={true}
                      label="Add"
                      onClick={this.pushPersonHandler}
                    />
                  </div>
                )}
            </div>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default AdminPanel;
