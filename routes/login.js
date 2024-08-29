const express = require("express");
const { Router } = require("express");

const passport = require("passport");

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
  res.render("login");
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = loginRouter;
