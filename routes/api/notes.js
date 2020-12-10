const router = require("express").Router()
const usersController = require('../../controllers/usersController')

router.route("/")
    .get(usersController.findAll)
    .post(usersController.addNote)


router
    .route("/:id")
    //.put(usersController.update)
    .delete(usersController.removeNote)

module.exports = router