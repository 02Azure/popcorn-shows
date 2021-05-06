const express = require('express')
const router = express.Router()
const movies = require("./movies")
const tv = require("./tv")

router.use("/movies", movies)
router.use("/tv", tv)

module.exports = router