const db = require("../models")

async function findAll(req, res){
    let result = await db.User.find({})
    console.log('Retrieved from the Database(events): ', result)
    res.json(result)
}

async function create(req, res){
    console.log('Controller.create function reached ... Data received: ', req.body)
    let result = await db.User.create({events: req.body})
}

async function update(req, res){
    console.log(`Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(req.body)}, new Data: ${JSON.stringify(req.body.event)}`)
    let result = await db.User.findOneAndUpdate({events: {id: req.params.id}}, {events: req.body.event})
}

async function remove(req, res){
    console.log(`Deleting item id: ${req.params.id} from the database`)
    let result = await db.User.findByIdAndDelete({events:{id: req.params.id}})
    res.send({message: "Deleted Item"})
}

module.exports = {findAll, create, update, remove}