const router = require("express").Router()
const usersController = require('../../controllers/usersController')

router.route("/")
    .get(usersController.findAll)
    .post(usersController.addEvent)
    
router
    .route("/:id")
    .put(usersController.updateEvent)
    .delete(usersController.removeEvent)

module.exports = router