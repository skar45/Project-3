const db = require("../models")

async function findAll(req, res){
    let result = await db.User.find()
    console.log('Retrieved from the Database(user): ', result)
    res.json(result)
}

async function create(req, res){
    console.log('Controller.create function reached ... Data received: ', req.body)
    //let result = await db.User.create(req.body)
}

async function addEvent(req, res){
    console.log('[usersController addEvent] function reached: req.body=', req.body)
    let result = await db.User.findOneAndUpdate({email: req.body.user}, {events: [req.body.events]})
}

async function addNote(req, res){
    console.log('[usersController addEvent] function reached: req.body=', req.body)
    //console.log(`[Update Note] Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(req.body)}, new Data: ${JSON.stringify(req.body.event)}`)
    let result = await db.User.findOneAndUpdate({email: req.body.user}, {notes: [req.body.notes]})
}

// async function remove(req, res){
//     console.log(`Deleting item id: ${req.params.id} from the database`)
//     let result = await db.User.findByIdAndDelete({events:{id: req.params.id}})
//     res.send({message: "Deleted Item"})
// }

module.exports = {findAll, create, addEvent, addNote}