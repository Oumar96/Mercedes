import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";

const API_BASE = "http://localhost:8000/";

class AppointmentApp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      schedule: [],
      hcn: "",
      confirmationModalOpen: false,
      appointmentDateSelected: false,
      appointmentMeridiem: 0,
      appointmentType: "",
      finished: false,
      smallScreen: window.innerWidth < 768,
      stepIndex: 0
    };
  }
  handleSetAppointmentDate(date) {
    this.setState({ appointmentDate: date, confirmationTextVisible: true });
  }
  handleSetAppointmentType(type) {
    this.setState({ appointmentType: type });
  }
  handleSetAppointmentSlot(slot) {
    this.setState({ appointmentSlot: slot });
  }
  handleSetAppointmentMeridiem(meridiem) {
    this.setState({ appointmentMeridiem: meridiem });
  }
  handleSubmit() {
    this.setState({ confirmationModalOpen: false });
    const newAppointment = {
      type: this.state.appointmentType,
      slot_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
      slot_time: this.state.appointmentSlot,
      hcn: this.state.hcn
    };
    axios
      .post(API_BASE + "api/appointmentCreate", newAppointment)
      .then(response =>
        this.setState({
          confirmationSnackbarMessage: "Appointment succesfully added!",
          confirmationSnackbarOpen: true,
          processed: true
        })
      )
      .catch(err => {
        console.log(err);
        return this.setState({
          confirmationSnackbarMessage: "Appointment failed to save.",
          confirmationSnackbarOpen: true
        });
      });
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  checkDisableDate(day) {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
      this.state.schedule[dateString] === true ||
      moment(day)
        .startOf("day")
        .diff(moment().startOf("day")) < 0
    );
  }

  renderAppointmentConfirmation() {
    const spanStyle = { color: "#00C853" };
    return (
      <section>
        <p>
          Type: <span style={spanStyle}>{this.state.appointmentType}</span>
        </p>
        <p>
          Health Care Number: <span style={spanStyle}>{this.state.hcn}</span>
        </p>
        <p>
          Appointment:{" "}
          <span style={spanStyle}>
            {moment(this.state.appointmentDate).format(
              "dddd[,] MMMM Do[,] YYYY"
            )}
          </span>{" "}
          at{" "}
          {this.getAppointmentTime()}
        </p>
      </section>
    );
  }

  getAppointmentTime() {
    const spanStyle = { color: "#00C853" };
    var slot = this.state.appointmentSlot;
    if (this.state.appointmentType === "Non-Urgent") {
      return (
        <span style={spanStyle}>
            {moment()
              .hour(8)
              .minute(0)
              .add(slot * 20, "minutes")
              .format("h:mm a")}
        </span>
      );
    } else if (this.state.appointmentType === "Annual") {
      return (
        <span style={spanStyle}>
            {moment()
              .hour(8)
              .minute(0)
              .add(slot, "hours")
              .format("h:mm a")}
        </span>
      );
    }
  }

  renderAppointmentTimes() {
    if (this.state.appointmentType === "Non-Urgent") {
      if (!this.state.isLoading) {
        const slots = [...Array(36).keys()];
        return slots.map(slot => {
          const appointmentDateString = moment(this.state.appointmentDate).format(
            "YYYY-DD-MM"
          );
          const time1 = moment()
          .hour(8)
          .minute(0)
          .add(slot * 20, "minutes");
          const time2 = moment()
          .hour(8)
          .minute(0)
          .add((slot * 20) + 20, "minutes");
          const scheduleDisabled = this.state.schedule[appointmentDateString]
          ? this.state.schedule[
            moment(this.state.appointmentDate).format("YYYY-DD-MM")
          ][slot]
          : false;
          const meridiemDisabled = this.state.appointmentMeridiem
          ? time1.format("a") === "am"
          : time1.format("a") === "pm";
          return (
            <RadioButton
              label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
              key={slot}
              value={slot}
              style={{
                marginBottom: 15,
                display: meridiemDisabled ? "none" : "inherit"
              }}
              disabled={scheduleDisabled || meridiemDisabled}
              />
          );
        });
      } else {
        return null;
      }
    } else if (this.state.appointmentType === "Annual"){
      if (!this.state.isLoading) {
        const slots = [...Array(12).keys()];
        return slots.map(slot => {
          const appointmentDateString = moment(this.state.appointmentDate).format(
            "YYYY-DD-MM"
          );
          const time1 = moment()
          .hour(8)
          .minute(0)
          .add(slot, "hours");
          const time2 = moment()
          .hour(8)
          .minute(0)
          .add(slot + 1, "hours");
          const scheduleDisabled = this.state.schedule[appointmentDateString]
          ? this.state.schedule[
            moment(this.state.appointmentDate).format("YYYY-DD-MM")
          ][slot]
          : false;
          const meridiemDisabled = this.state.appointmentMeridiem
          ? time1.format("a") === "am"
          : time1.format("a") === "pm";
          return (
            <RadioButton
              label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
              key={slot}
              value={slot}
              style={{
                marginBottom: 15,
                display: meridiemDisabled ? "none" : "inherit"
              }}
              disabled={scheduleDisabled || meridiemDisabled}
              />
          );
        });
      } else {
        return null;
      }
    }
  }

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <div style={{ margin: "12px 0" }}>
        <RaisedButton
          label={stepIndex === 3 ? "Finish" : "Next"}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          backgroundColor="#00C853 !important"
          style={{ marginRight: 12, backgroundColor: "#00C853" }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {
      finished,
      isLoading,
      smallScreen,
      stepIndex,
      confirmationModalOpen,
      confirmationSnackbarOpen,
      ...data
    } = this.state;
    const contactFormFilled = data.hcn;
    const DatePickerExampleSimple = () => (
      <div>
        <DatePicker
          hintText="Select Date"
          mode={smallScreen ? "portrait" : "landscape"}
          onChange={(n, date) => this.handleSetAppointmentDate(date)}
          shouldDisableDate={day => this.checkDisableDate(day)}
        />
      </div>
    );
    const modalActions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen: false })}
      />,
      <FlatButton
        label="Confirm"
        style={{ backgroundColor: "#00C853 !important" }}
        primary={true}
        onClick={() => this.handleSubmit()}
      />
    ];
    return (
      <div>
        <MuiThemeProvider>
        <section
          style={{
            maxWidth: !smallScreen ? "80%" : "100%",
            margin: "auto",
            marginTop: !smallScreen ? 20 : 0
          }}
        >
          <Card
            style={{
              padding: "12px 12px 25px 12px",
              height: smallScreen ? "100vh" : null
            }}
          >
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear={false}
            >
            <Step>
              <StepLabel>
                Choose an appointment type
              </StepLabel>
              <StepContent>
                <SelectField
                  floatingLabelText="Type"
                  value={data.appointmentType}
                  onChange={(evt, key, newValue) =>
                    this.handleSetAppointmentType(newValue)
                  }
                >
                  <MenuItem value={"Non-Urgent"} primaryText="Non-Urgent" />
                  <MenuItem value={"Annual"} primaryText="Annual Checkup" />
                </SelectField>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
              <Step>
                <StepLabel>
                  Choose an available day for your appointment
                </StepLabel>
                <StepContent>
                  {DatePickerExampleSimple()}
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step disabled={!data.appointmentDate}>
                <StepLabel>
                  Choose an available time for your appointment
                </StepLabel>
                <StepContent>
                  <SelectField
                    floatingLabelText="AM/PM"
                    value={data.appointmentMeridiem}
                    onChange={(evt, key, payload) =>
                      this.handleSetAppointmentMeridiem(payload)
                    }
                    selectionRenderer={value => (value ? "PM" : "AM")}
                  >
                    <MenuItem value={0} primaryText="AM" />
                    <MenuItem value={1} primaryText="PM" />
                  </SelectField>
                  <RadioButtonGroup
                    style={{
                      marginTop: 15,
                      marginLeft: 15
                    }}
                    name="appointmentTimes"
                    defaultSelected={data.appointmentSlot}
                    onChange={(evt, val) => this.handleSetAppointmentSlot(val)}
                  >
                    {this.renderAppointmentTimes()}
                  </RadioButtonGroup>
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  Enter patient information
                </StepLabel>
                <StepContent>
                  <p>
                    <section>
                      <TextField
                        style={{ display: "block" }}
                        name="hcn"
                        hintText="Health Care Number"
                        floatingLabelText="Health Care Number"
                        onChange={(evt, newValue) =>
                          this.setState({ hcn: newValue })
                        }
                      />
                      <RaisedButton
                        style={{ display: "block", backgroundColor: "#00C853", marginTop: 20, maxWidth: 100 }}
                        label={
                          contactFormFilled
                            ? "Schedule"
                            : "Fill out your information"
                        }
                        labelPosition="before"
                        primary={true}
                        fullWidth={true}
                        onClick={() =>
                          this.setState({
                            confirmationModalOpen: !this.state
                              .confirmationModalOpen
                          })
                        }
                        disabled={!contactFormFilled || data.processed}
                      />
                    </section>
                  </p>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            modal={true}
            open={confirmationModalOpen}
            actions={modalActions}
            title="Confirm your appointment"
          >
            {this.renderAppointmentConfirmation()}
          </Dialog>
          <SnackBar
            open={confirmationSnackbarOpen || isLoading}
            message={
              isLoading ? "Loading... " : data.confirmationSnackbarMessage || ""
            }
            autoHideDuration={10000}
            onRequestClose={() =>
              this.setState({ confirmationSnackbarOpen: false })
            }
          />
        </section>
      </MuiThemeProvider>
      </div>
    );
  }
}
export default AppointmentApp;
