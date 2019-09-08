import mongoose from "mongoose";
import express from "express";
import expressGraphQL from 'express-graphql'
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import config from "./config";
import { coordsRouter } from './routes'

const isProduction = process.env.NODE_ENV === "production";
const { cookie, port, secret, mongoUrl } = config;

// create application
const app = express();

// express config defaults
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(
    session({
        secret,
        cookie,
        resave: false,
        saveUninitialized: false
    })
);

// define routes
app.use('/coords', coordsRouter);

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    const server = app.listen(process.env.PORT || port, function () {
        console.log("Listening on port " + server.address().port);
    });
});
