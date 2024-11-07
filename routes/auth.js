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

router.post("/login", authController.handleLogIn);


router.post('/register', authController.handleNewUser);

router.post('/RefreshJWT', verifyJWT, authController.handleRefreshToken);

router.get('/logout', verifyJWT, authController.handleLogout);



router.all('*', (req, res) => {
  res.sendStatus(404)
});


module.exports = router;