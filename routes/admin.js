const express = require("express");
const path = require("path");
const router = express.Router();
const moongose_api = require('../controllers/moongose_api');

router.post('/Add/:email', async (req, res) => {
  const email = req.params.email.replace(/"/g, '');
  const out = await moongose_api.addAdminRole(email);
  var err = out[0]
  var data = out[1]
  if (err)
    res.status(500).json(err)
  else
    res.send(data)
});

router.post('/Remove/:email', async (req, res) => {
  const email = req.params.email.replace(/"/g, '');
  const out = await moongose_api.removeAdminRole(email);
  var err = out[0]
  var data = out[1]
  if (err)
    res.status(500).json(err)
  else
    res.send(data)
});

router.get('/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../Views/admin', `admin_${req.params.file}.html`));
});

router.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../views', '404.html'));
});




module.exports = router;