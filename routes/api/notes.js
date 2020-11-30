const router = require("express").Router()
const notesController = require('../../controllers/notesController')
const usersController = require('../../controllers/usersController')

router.route("/")
    .get(notesController.findAll)
    .post(usersController.addNote)
    //.put(usersController.updateNote)

// router
//     .route("/:id")
//     .put(notesController.update)
//     .delete(notesController.remove)

module.exports = router