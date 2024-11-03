const express = require("express");
const path = require("path");
const router = express.Router();

//the test is my secret route for testing JWT for supplier
/*router.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', 'home.html'));
});*/

router.get('/cart/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/cart', `${req.params.file}.html`));
});

router.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, '../Views', 'productPage.html'));
});
router.get('/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', `${req.params.file}.html`));
});








module.exports = router;