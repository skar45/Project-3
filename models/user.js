const mongoose = require('mongoose')
const Schema = mongoose.Schema

// // FIXME: start and end type
// const eventSchema = new Schema({
//     id: String,
//     title: String,
//     start: Date,
//     end: Date,
//     allDay: Boolean
// })

const userSchema = new Schema({
    given_name: String,
    family_name: String,
    email: {type: String, unique: true},
    events: [{
        id: {type: String},
        title: String,
        start: Date,
        end: Date,
        allDay: Boolean
    }],
    notes: [{
        id: {type: String},
        title: String,
        description: String
    },]
})

const User = mongoose.model('User', userSchema)

module.exports = User

// random characters lol "00HhXmxcraqtz2a5x6qQVfgx5UT449jE0y5kc-eINm"