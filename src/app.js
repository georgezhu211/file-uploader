require("dotenv/config");

const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require("./config/passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./db/prisma");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  }),
);
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.use("/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
