const express = require('express')
const router = express.Router()
const TvseriesController = require("../controllers/index-controller")

router.get("/", TvseriesController.getAll)
router.post("/", TvseriesController.add)
router.get("/:id", TvseriesController.getOne)
router.put("/:id", TvseriesController.edit)
router.delete("/:id", TvseriesController.delete)

module.exports = router