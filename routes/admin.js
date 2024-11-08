const express = require("express");
const path = require("path");
const router = express.Router();
const moongose_api = require('../controllers/moongose_api');


router.get('/baskets', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/admin', `admin_baskets.html`));
});

router.get('/graphs', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/admin', `admin_graphs.html`));
});

router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/admin', `admin_products.html`));
});

router.get('/suppliers', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/admin', `admin_suppliers.html`));
});

router.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/admin', `admin_users.html`));
});

router.get('/', (req, res) => {
  res.redirect('/admin/users')
});

router.all('*', (req, res) => {
  res.sendStatus(404);
});




module.exports = router;