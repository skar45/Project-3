const router = require("express").Router()
const usersController = require("../../controllers/usersController.js")

router.route("/")
    .get(usersController.findAll)
    .post(usersController.createUser)

module.exports = router
