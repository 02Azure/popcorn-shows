const express = require('express')
const router = express.Router()
const movies = require("./movies")
const tvseries = require("./tvseries")

router.use("/movies", movies)
router.use("/tvseries", tvseries)

module.exports = router