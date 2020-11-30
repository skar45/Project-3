const router = require("express").Router()
const eventRoutes = require("./events")
const noteRoutes = require("./notes")

router.use("/events", eventRoutes)
router.use("/notes", noteRoutes)

module.exports = router