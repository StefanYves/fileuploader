const express = require("express");
const { Router } = require("express");

const auth = require("../controllers/auth");

const signupRouter = express.Router();

signupRouter.get("/", (req, res) => {
  res.render("signup");
});

signupRouter.post("/", auth.createUser);

module.exports = signupRouter;
