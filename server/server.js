require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Сross-origin resource sharing permission.
app.use(cors());

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });
  } catch (err) {
    console.error(err);
  };
})();

// // Seeds injection.
// require('./seed/seeder')();

// Server start and connect to DB.
(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(process.env.APP_PORT, () => {
      console.log(`Server listening on port ${process.env.APP_PORT}.`);
    });
  } catch (err) {
    console.error(`Connection failed: ${process.env.DB_CONNECT}`, err);
  };
})();