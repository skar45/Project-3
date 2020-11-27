const router = require("express").Router()
const eventsController = require('../../controllers/eventsController')

// router.route("/")
//     .get(eventsController.findAll)
//     .post(eventsController.create)

router.post("/api/events", async function(req, res){
    console.log('I have arrived')
})
    
router
    .route("/:id")
    .put(eventsController.update)
    .delete(eventsController.remove)

module.exports = router