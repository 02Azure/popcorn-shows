const express = require('express')
const router = express.Router()
const MovieController = require("../controllers/index-controller")

router.get("/", MovieController.getAll)
router.post("/", MovieController.add)
router.get("/:id", MovieController.getOne)
router.put("/:id", MovieController.edit)
router.delete("/:id", MovieController.delete)


module.exports = router