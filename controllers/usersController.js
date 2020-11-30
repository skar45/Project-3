const db = require("../models");

async function findAll(req, res) {
  let result = await db.User.find();
  console.log("Retrieved from the Database(user): ", result);
  res.json(result);
}

async function createUser(req, res) {
  console.log(
    "Controller.create function reached ... Data received: ",
    req.body
  );
  // TODO: if statement to detemine if user already exists
  //let dbRes = await db.User.find({})
  let result = await db.User.create(req.body);
}

// //PersonModel.update(
//     { _id: person._id },
//     { $push: { friends: friend } },
//     done
// );

async function addEvent(req, res) {
  console.log(
    "[usersController addEvent] function reached: req.body=",
    req.body
  );
  let result = await db.User.findOneAndUpdate(
    { email: req.body.user },
    { $push: { events: req.body.events } },
    function (error, success) {
      if (error) {
        console.log('ERROR!!!', error);
      } else {
        console.log(success);
      }
    }
  );
}

async function updateEvent(req, res) {
  console.log(
    `Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(
      req.body
    )}, new Data: ${JSON.stringify(req.body.event)}`
  );
  let result = await db.User.findOneAndUpdate(
    { events: { id: req.params.id } },
    { events: req.body.event }
  );
}

async function removeEvent(req, res) {
  console.log(`Deleting item id: ${req.params.id} from the database`);
  let result = await db.User.findByIdAndDelete({
    events: { id: req.params.id },
  });
  res.send({ message: "Deleted Item" });
}

async function addNote(req, res) {
  console.log(
    "[usersController addEvent] function reached: req.body=",
    req.body
  );
  //console.log(`[Update Note] Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(req.body)}, new Data: ${JSON.stringify(req.body.event)}`)
  let result = await db.User.findOneAndUpdate(
    { email: req.body.user },
    { $push: { notes: req.body.notes } }
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
