const router = require("express").Router()
const notesController = require('../../controllers/notesController')

router.route("/")
    .get(notesController.findAll)
    .post(notesController.create)

router
    .route("/:id")
    .put(notesController.update)
    .delete(notesController.remove)

module.exports = router