const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Appointment {
    _id: ID!
    date: String!
    price: Float!
    creator: Patient!
  }

  type Patient {
    _id: ID!
    hcn: String!
    password: String
    birthday: Int!
    gender: String!
    phoneNumber: String!
    physicalAddress: String!
    emailAddress: String!
    createdAppointments: [Appointment!]
  }

  type Nurse {
    _id: ID!
    accessID: String!
    password: String
    createdAppointments: [Appointment!]
  }
  
type Doctor {
    _id: ID!
    permitNumber: Int!
    lastName: String!
    firstName: String!
    speciality: String!
    city: String!
    createdAppointments: [Appointment!]
  }

  input AppointmentInput {
    date: String!
    price: Float!
  }

  input PatientInput {
    hcn: String!
    password: String!
    birthday: Int!
    gender: String!
    phoneNumber: String!
    physicalAddress: String!
    emailAddress: String!
  }

  type RootQuery {
    appointments: [Appointment!]!
  }

  type RootMutation {
    createAppointment(appointmentInput: AppointmentInput): Appointment
    createPatient(patientInput: PatientInput): Patient
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
  `);
