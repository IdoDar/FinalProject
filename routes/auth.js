const express = require("express");
const path = require("path");
const router = express.Router();
const authController = require('../controllers/authJWTController');
const verifyJWT = require('../middleware/verifyJWT')

//the test is my secret route for testing JWT 
router.get("/test", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'sign_in_up.html'));
});

router.get("^/$|/login(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'login.html'));
});
router.post("^/$|/login(.html)?", authController.handleLogIn);

router.get("^/new$|/register(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'login.html'));
});

router.post('^/new$|/register(.html)?', authController.handleNewUser);

router.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
});


module.exports  = router;