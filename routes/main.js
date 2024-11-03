const express = require("express");
const path = require("path");
const router = express.Router();

//the test is my secret route for testing JWT for supplier
router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, '../Views', 'home.html'));
});

router.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, '../Views', 'productPage.html'));
});




module.exports = router;