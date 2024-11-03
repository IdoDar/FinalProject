const express = require("express");
const path = require("path");
const router = express.Router();
const authController = require('../controllers/authJWTController');
const verifyJWT = require('../middleware/verifyJWT')

router.get('/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/admin', `admin_${req.params.file}.html`));
});

router.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
});


module.exports = router;