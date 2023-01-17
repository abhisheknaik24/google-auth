require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("./middleware/passport");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.authenticate("session"));

app.use("/auth/google", authRoutes);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Google OAuth app listening on port ${port}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
