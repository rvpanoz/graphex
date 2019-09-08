"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _config = _interopRequireDefault(require("./config"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isProduction = process.env.NODE_ENV === "production";
var cookie = _config["default"].cookie,
    port = _config["default"].port,
    secret = _config["default"].secret,
    mongoUrl = _config["default"].mongoUrl; // create application

var app = (0, _express["default"])(); // express config defaults

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(_express["default"]["static"](__dirname + "/public"));
app.use((0, _expressSession["default"])({
  secret: secret,
  cookie: cookie,
  resave: false,
  saveUninitialized: false
})); // define routes

app.use('/coords', _routes.coordsRouter); // create application/json parser

var jsonParser = _bodyParser["default"].json(); // create application/x-www-form-urlencoded parser


var urlencodedParser = _bodyParser["default"].urlencoded({
  extended: false
}); // register errorHandler


if (!isProduction) {
  app.use((0, _errorhandler["default"])());
} // start database connection


if (isProduction) {
  _mongoose["default"].connect(process.env.MONGODB_URI);
} else {
  _mongoose["default"].connect(mongoUrl, {
    useNewUrlParser: true
  }); // log queries in the console


  _mongoose["default"].set("debug", true); // disable buffering - https://mongoosejs.com/docs/connections.html


  _mongoose["default"].set("bufferCommands", false);
} // db events handling


var db = _mongoose["default"].connection; // handle connection error

db.on("error", function (error) {
  return console.error(error);
}); // connection is established

db.once("open", function () {
  // start the server
  var server = app.listen(process.env.PORT || port, function () {
    console.log("Listening on port " + server.address().port);
  });
});