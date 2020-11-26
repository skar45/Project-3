const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = newSchema({
    id: String,
    title: String,
    start: Date.UTC,
    end: Date.UTC,
    allDay: Boolean
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event