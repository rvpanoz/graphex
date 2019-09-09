import mongoose from "mongoose";
import express from "express";
import expressGraphql from "express-graphql";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import config from "./configs";
import schema from "./graphql";

const isProduction = process.env.NODE_ENV === "production";
const { cookie, port, secret, mongoUrl } = config;
const app = express();

// express config defaults
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// define graphQL middleware
app.use(
  "/graphql",
  expressGraphql({
    schema,
    graphiql: true
  })
);

// register errorHandler
if (!isProduction) {
  app.use(errorHandler());
}

// start database connection
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true
  });

  // log queries in the console
  mongoose.set("debug", true);

  // disable buffering - https://mongoosejs.com/docs/connections.html
  mongoose.set("bufferCommands", false);
}

// db events handling
const db = mongoose.connection;

// handle connection error
db.on("error", error => console.error(error));

// connection is established
db.once("open", () => {
  // start the server
  const server = app.listen(process.env.PORT || port, function() {
    console.log("Listening on port " + server.address().port);
  });
});
