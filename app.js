const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type RootQuery {
      doctors: [String!]!
    }

    type RootMutation {
      createDoctor(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `),
    rootValue: {
      doctors: () => {
        return ['Doctor1', 'Doctor2', 'Doctor3'];
      },
      createEvent: (args) => {
        const doctorName = args.name;
        return doctorName;
      }
    },
    graphiql: true
  })
);

app.listen(3000);
