const mongoose = require('mongoose')
const Schema = mongoose.Schema

// FIXME: start and end type
const eventSchema = new Schema({
    id: String,
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event

// const userSchema = new Schema({
//     firstName: String,
//     email: String,
//     password: String,
//     events: [{
//         id: String,
//         title: String,
//         start: Date,
//         end: Date,
//         allDay: Boolean
//     }],
//     notes: [{
//         id: String,
//         title: String,
//         description: String
//     }]
// })