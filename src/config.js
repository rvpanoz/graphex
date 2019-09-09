import dotenv from "dotenv";

// reading .env file and make config values available in process.env
dotenv.config();

const { DB_USER, DB_PASS, DB_NAME, PORT } = process.env;

const config = {
  mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-diifo.mongodb.net/${DB_NAME}`,
  port: PORT,
  secret: "mySecret",
  cookie: { maxAge: 60000 }
};

export default config;
