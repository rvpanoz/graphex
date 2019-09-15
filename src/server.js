import mongoose from "mongoose";
import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import config from "./config";
import schema from "./graphql/schema";
import resolvers from './graphql';

const isProduction = process.env.NODE_ENV === "production";
const { port, mongoUrl } = config;
const app = express();

// express config defaults
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist"));

// define graphQL middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

// mongodb connection
mongoose.connect(mongoUrl, {
  useNewUrlParser: true
});

// log queries in the console
mongoose.set("debug", true);

// disable buffering - https://mongoosejs.com/docs/connections.html
mongoose.set("bufferCommands", false);

const db = mongoose.connection; // db events handling

// handle connection error
db.on("error", error => console.error(error));

// server start
db.once("open", () => {
  const server = app.listen(process.env.PORT || port, function () {
    console.log(`Listening on port ${server.address().port}`);
  });
});
