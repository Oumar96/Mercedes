const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type Appointment {
    _id: ID!
    type: String!
    slots: Slot
  }

  type Slot {
    _id: ID!
    slot_time: String!
    slot_date: String!
    created_at: String!
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
    accessId: String!
    password: String
    createdAppointments: [Appointment!]
  }

  type Doctor {
    _id: ID!
    permitNumber: Int!
    lastName: String!
    firstName: String!
    specialty: String!
    city: String!
    createdAppointments: [Appointment!]
  }

  type User {
    _id: ID!
    email: String!
    password: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    email: String!
    password: String!
  }

  input PatientInput {
    hcn: String!
    birthday: Int
    gender: String
    phoneNumber: String
    physicalAddress: String
    emailAddress: String
  }

  input NurseInput {
    accessId: String!
    password: String!
  }

  input DoctorInput {
    permitNumber: Int!
    lastName: String!
    firstName: String!
    specialty: String!
    city: String!
  }

  type RootQuery {
      login(email: String!, password: String!): AuthData!
      appointments: [Appointment!]!
      slots: [Slot!]!
      patients: [Patient!]!
      nurses: [Nurse!]!
      doctors: [Doctor!]!
  }

  type RootMutation {
      createUser(userInput: UserInput): User
      createPatient(patientInput: PatientInput): Patient
      createNurse(nurseInput: NurseInput): Nurse
      createDoctor(doctorInput: DoctorInput): Doctor
      cancelAppointment(appointmentId: ID!): Boolean!
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
