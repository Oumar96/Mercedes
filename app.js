const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Appointment = require('./models/appointment')

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Appointment {
      _id: ID!
      date: String!
      price: Float!
    }

    input AppointmentInput {
      date: String!
      price: Float!
    }

    type RootQuery {
      appointments: [Appointment!]!
    }

    type RootMutation {
      createAppointment(appointmentInput: AppointmentInput): Appointment
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `),
    rootValue: {
      appointments: () => {
        return Appointment.find()
        .then(appointments => {
          return appointments.map(appointment => {
            // Converting _id to a string to show in graphiql
            return { ...appointment._doc, _id: appointment.id }
          });
        })
        .catch(err => {
          throw err
        });
      },
      createAppointment: args => {
        const appointment = new Appointment({
          date: new Date(args.appointmentInput.date),
          price: +args.appointmentInput.price
        });
        // save() function provided by mongoose package
        return appointment
        .save()
        .then(result => {
          console.log(result);
          return { ...result._doc, _id: appointment.id };
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
      }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster344-mwk1r.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
  .then(() => {app.listen(8080);})
  .catch(err => {console.log(err);});
