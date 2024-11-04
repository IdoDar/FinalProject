const express = require("express");
const path = require("path");
const router = express.Router();
const authController = require('../controllers/authJWTController');
const verifyJWT = require('../middleware/verifyJWT')


router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'sign_in_up.html'));
});
router.get("/Terms_and_privacy", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'Terms_and_privacy.html'));
});

router.get("^/$|/login(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'login.html'));
});
router.post("^/$|/login(.html)?", authController.handleLogIn);

router.get("^/new$|/register(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'login.html'));
});

router.post('^/new$|/register(.html)?', authController.handleNewUser);

router.post('/RefreshJWT', authController.handleRefreshToken);

router.get('/logout', authController.handleLogout);



router.all('*', (req, res) => {
  res.sendStatus(404)
});


module.exports = router;