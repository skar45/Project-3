const db = require("../models")

async function findAll(req, res){
    let result = await db.Event.find({})
    console.log('Retrieved from the Database: ', result)
    res.json(result)
}

async function create(req, res){
    console.log('Controller.create function reached ... Data received: ', req.body)
    let result = await db.Event.create(req.body)
}

async function update(req, res){
    console.log(`Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(req.body)}, new Data: ${JSON.stringify(req.body.event)}`)
    let result = await db.Event.findOneAndUpdate({id: req.params.id}, req.body.event)
}

async function remove(req, res){
    console.log(`Deleting item id: ${req.params.id} from the database`)
    let result = await db.Event.findByIdAndDelete({id: req.params.id})
    res.send({message: "Deleted Item"})
}

module.exports = {findAll, create, update, remove}