"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// server configuration
var config = {
  mongoUrl: "mongodb+srv://dbAdmin:z0ubr0!28@cluster0-diifo.mongodb.net/db_zero",
  port: 3030,
  secret: "mySecret",
  cookie: {
    maxAge: 60000
  }
};
var _default = config;
exports["default"] = _default;