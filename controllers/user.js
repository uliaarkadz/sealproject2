/////////////////////////
//Impport dependancies
////////////////////////

const express = require("express");
const userActions = require("../actions/user");

/////////////////////////
//Create router
////////////////////////
const router = express.Router();

/////////////////////////
//Routes
////////////////////////

// Signup Page Route (get -> /user/signup -> form)
router.get("/signup", userActions.signup);

// Signup Submit Route (post -> /user/signup -> create the user)
router.post("/signup", userActions.createUser);

// Login page Route (get -> /user/login -> form)
router.get("/login", userActions.login);

// Login submit route (post -> /user/login -> login the user)
router.post("/login", userActions.loginSubmit);

// Logout Route (??? -> destroy the session)
router.get("/logout", userActions.logout);

//////////////////////
// Export the Router
//////////////////////
module.exports = router;
