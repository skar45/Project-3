const router = require("express").Router()
const eventsController = require('../../controllers/eventsController')
const usersController = require('../../controllers/usersController')

router.route("/")
    .get(eventsController.findAll)
    .post(usersController.addEvent)
    
router
    .route("/:id")
    .put(eventsController.update)
    .delete(eventsController.remove)

module.exports = router