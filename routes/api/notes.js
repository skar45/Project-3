const router = require("express").Router()
const usersController = require('../../controllers/usersController')

router.route("/")
    .get(usersController.findAll)
    .post(usersController.addNote)
    //.put(usersController.updateNote)

// router
//     .route("/:id")
//     .put(notesController.update)
//     .delete(notesController.remove)

module.exports = router