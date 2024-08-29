const express = require("express");
const { Router } = require("express");

const logoutRouter = express.Router();

logoutRouter.get("/", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  });
});
module.exports = logoutRouter;
