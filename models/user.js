const mongoose = require('mongoose')
const Schema = mongoose.Schema

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