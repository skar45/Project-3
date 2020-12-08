const db = require("../models");

async function findAll(req, res) {
  let result = await db.User.find();
  console.log("Retrieved from the Database: ", result);
  res.json(result);
}

async function createUser(req, res) {
  console.log(
    "Controller.create function reached ... Data received: ",
    req.body
  );
  //if statement to detemine if user already exists
  let dbRes = await db.User.find({email: req.body.email})
  if (!(dbRes == false)) {
    console.log('Current user found! =>', dbRes)
    return
  } else {
    let result = await db.User.create(req.body);
    console.log('New user added', result)
  }
  
}

async function addEvent(req, res) {
  const hacksolution = await db.User.find();
  console.log('hack solution: ', JSON.parse(JSON.stringify(hacksolution))[0].events)
  const events = JSON.parse(JSON.stringify(hacksolution))[0].events
  console.log(
    "[usersController addEvent] function reached: req.body=",
    req.body.events
  );
  let result = await db.User.findOneAndUpdate(
    { email: req.body.user },
    { events: [...events,req.body.events] } ,
    function (error, success) {
      if (error) {
        console.log('ERROR!!!', error);
      } else {
        console.log('Successfully added event');
      }
    }
  );
  console.log('addEvent: ', result)
}

async function updateEvent(req, res) {  
  console.log(`New data for event with id ${req.params.id}, ${req.body.events.oldEvent.title} = ${JSON.stringify(req.body.events.event)}`)
  let result = await db.User.findOneAndUpdate({'events.id':req.params.id}, {$set: {'events.$': req.body.events.event}})
  console.log('[updateEvent] function result=', result)
}

async function removeEvent(req, res) {
  console.log(`Deleting item id: ${req.params.id} from the database. req.body=`, req.body);

  let result = await db.User.updateOne({'event.id': req.params.id}, {$unset: {events: {id: req.params.id}}}, {safe: true, multi: true}, function(err, obj){
    if (err){
      console.log('ERROR!!!', err)
    } else{
      console.log('SUCCESSFULLY deleted item', obj)
    }
  })
  res.send({ message: "Deleted Item" });
}


async function addNote(req, res) {
  console.log(
    "[usersController addnote] function reached: req.body=",
    req.body
  );
  //console.log(`[Update Note] Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(req.body)}, new Data: ${JSON.stringify(req.body.event)}`)
  let result = await db.User.findOneAndUpdate(
    { email: req.body.user},
    { $push: { notes: req.body.notes } },
    function (error, success) {
      if (error) {
        console.log('ERROR!!!', error);
      } else {
        console.log('Successfully added note:', success);
      }
    }
  );
}

// async function remove(req, res){
//     console.log(`Deleting item id: ${req.params.id} from the database`)
//     let result = await db.User.findByIdAndDelete({events:{id: req.params.id}})
//     res.send({message: "Deleted Item"})
// }

module.exports = {
  findAll,
  createUser,
  addEvent,
  updateEvent,
  removeEvent,
  addNote,
};
