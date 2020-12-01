const router = require("express").Router()
const eventRoutes = require("./events")
const noteRoutes = require("./notes")
const userRoutes = require("./users")

router.use("/events", eventRoutes)
router.use("/notes", noteRoutes)
router.use("/users", userRoutes)

module.exports = router