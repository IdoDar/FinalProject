const express = require("express");
const path = require("path");
const router = express.Router();
const authController = require('../controllers/authJWTController');
const verifyJWT = require('../middleware/verifyJWT')

//the test is my secret route for testing JWT for supplier
router.get("/test", (req, res) => {
  res.send("Success");
});


router.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
});


module.exports  = router;