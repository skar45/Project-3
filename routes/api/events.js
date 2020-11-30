const router = require("express").Router()
const eventsController = require('../../controllers/eventsController')

// router.get("/api/events", function(req, res){
//     return res.send('GET I have arrived')
// })

// router.post("/api/events", async function(req, res){
//    return res.send('POST I have arrived')
// })

router.route("/")
    .get(eventsController.findAll)
    .post(eventsController.create)
    
router
    .route("/:id")
    .put(eventsController.update)
    .delete(eventsController.remove)

module.exports = router