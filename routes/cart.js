const express = require("express")
const path = require("path")
const router = express.Router()


router.route('/:id').get((req, res) => {
    res.sendFile(path.join(__dirname, '../views/cart', 'shopping_cart.html'))
});


router.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
});


module.exports  = router;