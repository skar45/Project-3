// const db = require("../models")

// async function findAll(req, res){
//     let result = await db.Event.find({})
//     console.log('Retrieved from the Database: ', result)
//     res.json(result)
// }

async function create(req, res){
    console.log('Controller.create function reached ... Data received: ', req.body)
    //let result = await db.Event.create(req.body)
}

module.exports = {findAll, create}