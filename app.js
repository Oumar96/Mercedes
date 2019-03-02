const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

var index = require('./routes/index');
const api = require('./routes/api/index');

const app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/api', api);
//app.use('/users', users);

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${
      process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
      }@cluster344-mwk1r.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
