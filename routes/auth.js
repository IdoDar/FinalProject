const express = require("express")
const path = require("path")
const router = express.Router()


router.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'sign_in_up.html'));
});

router.get("^/$|/login(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'login.html'));
});

router.get("^/new$|/register(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/auth', 'login.html'));
});

router.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
});


module.exports  = router;