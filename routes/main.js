const express = require("express");
const path = require("path");
const router = express.Router();


//Payments Routes
router.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/cart', `payment.html`));
});

router.get('/cart/shopping_cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/cart', `shopping_cart.html`));
});

//home Routes
router.get('/about_us', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', `about_us.html`));
});

router.get('/connect_to_user', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', `connect_to_user.html`));
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', `home.html`));
});

router.get('/old_orders', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', `old_orders.html`));
});

router.get('/user_info', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', `user_info.html`));
});





//Products Routes
router.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/main', 'productPage.html'));
});



router.all('*', (req, res) => {
  res.sendStatus(404);
});




module.exports = router;