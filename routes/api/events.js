const router = require("./node_modules/express").Router()
const eventsController = require('../../controllers/eventsController')

router.route("/")
    .get(eventsController.findAll)
    .post(eventsController.create)

router
    .route("/:id")
    .put(eventsController.update)
    .delete(eventsController.remove)

module.exports = router