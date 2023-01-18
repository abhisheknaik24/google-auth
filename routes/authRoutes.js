const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", passport.authenticate("google", ["profile", "email"]));

router.get("/login", (req, res) => {
  if (req.user) {
    req.login(req.user, (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Log In successfully!",
          data: req.user,
        });
      }
    });
  } else {
    res.redirect("/auth/google/callback");
  }
});

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/google/failed",
  })
);

router.get("/failed", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Log In failed!",
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    } else {
      res.redirect(process.env.CLIENT_URL);
    }
  });
});

module.exports = router;
