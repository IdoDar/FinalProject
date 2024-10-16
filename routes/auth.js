const express = require("express")
const router = express.Router()

//define logging for the command prompt of searching url
router.use(logger)

router.get("/", (req, res) => {
  res.render("auth/login")
})

router.get("/new", (req, res) => {
  res.render("auth/register")
})


function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router