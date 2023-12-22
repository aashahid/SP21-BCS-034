var express = require("express");
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  const errorMessage = req.flash('error')[0]; // Retrieve the flash message
    return res.render("site/login", {layout: './layouts/null-layout', errorMessage})
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
     req.flash("danger", "User with this email not present");
     return res.redirect("/register");
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
      req.session.user = user;
      return res.redirect("/");
    } else {
      req.flash("danger", "Invalid Password");
      return res.redirect("/login");
    }
  });

router.get("/register", (req, res) => {
    const messages = req.flash();
    return res.render("site/register", {layout: './layouts/null-layout', messages});
  });

router.get("/logout", (req, res) => {
    req.session.user = null;
    res.clearCookie("cart")
    console.log("session clear");
    return res.redirect("/");
});

router.post("/register", async(req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
      // req.flash("danger", "User with given email already registered");
      return res.redirect("/login");
  }
  user = new User(req.body);
  user.role = "customer"
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  
  await user.save();
  return res.redirect("/login");
  });

module.exports = router;