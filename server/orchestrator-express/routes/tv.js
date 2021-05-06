const express = require('express')
const router = express.Router()
const TvController = require("../controllers/tv-controller")

router.get("/", TvController.getAll)
router.post("/", TvController.add)
router.get("/:id", TvController.getOne)
router.put("/:id", TvController.edit)
router.delete("/:id", TvController.delete)

module.exports = router