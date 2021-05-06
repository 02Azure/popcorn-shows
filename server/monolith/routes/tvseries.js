const express = require('express')
const router = express.Router()
const TvseriesController = require("../controllers/tvseries-controller")

router.get("/", TvseriesController.getAll)

module.exports = router