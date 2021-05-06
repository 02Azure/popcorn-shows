const express = require('express')
const router = express.Router()
const TvController = require("../controllers/tv-controller")

router.get("/", TvController.getAll)

module.exports = router