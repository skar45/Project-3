const router = require("express").Router()
const usersController = require("../../controllers/usersController.js")

router.route("/")
    .get(usersController.findAll)
    .post(usersController.create)

// router
//     .route("/:id")
//     // .put(usersController.update)
//     .delete(usersController.remove)

// router
//     .route("/notes")
//     .put(usersController.updateNote)
//     .delete(usersController.removeNote)

module.exports = router
