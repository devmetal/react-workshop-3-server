require('dotenv').load();
require('./model');

const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const seed = require('./seed');

const { PORT, MONGO_URI } = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => {
    console.log('Mongodb Connected');
    seed()
      .then(() => console.log('Seed datas uploaded'))
      .catch(err => console.error(err));
  })
  .on('error', err => console.error(err));

const app = express();
app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log('App ready on', PORT);
});
