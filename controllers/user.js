/////////////////////////
//Impport dependancies
////////////////////////

const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/////////////////////////
//Create router
////////////////////////
const router = express.Router();

/////////////////////////
//Routes
////////////////////////

// Signup Page Route (get -> /user/signup -> form)
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

// Signup Submit Route (post -> /user/signup -> create the user)
router.post("/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    console.log("Hashed Password:", req.body.password);

    //create the user
    await User.create(req.body);

    //redirect user to login
    res.redirect("/user/login");
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
});

// Login page Route (get -> /user/login -> form)
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

// Login submit route (post -> /user/login -> login the user)
router.post("/login", async (req, res) => {
  try {
    // get the username and password from req.body
    const { username, password } = req.body;
    // search the database for the user
    const user = await User.findOne({ username });
    // check if the user exists
    if (!user) {
      throw new Error("User Error: User Doesn't Exist");
    }
    // check if the password matches
    const result = await bcrypt.compare(password, user.password);
    // check the result of the match
    if (!result) {
      throw new Error("User Error: Password Doesn't Match");
    }
    //save that the user is logged in in req.session
    req.session.username = username;
    req.session.loggedIn = true;

    // send them back to fruits
    res.redirect("/event");
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
});

// Logout Route (??? -> destroy the session)
router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/user/login");
  });
});

//////////////////////
// Export the Router
//////////////////////
module.exports = router;
