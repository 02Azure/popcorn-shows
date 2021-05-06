const express = require('express')
const router = express.Router()
const Controller = require("../controllers/index-controller")

router.get("/", Controller.getAll)

module.exports = router