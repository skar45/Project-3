/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {
    addEvent: function(eventData, userData){
        //console.log('API add event retrieved data: ', eventData, userData.email)
        console.log('called twice')
        return axios.post("/api/events", {events: eventData, user: userData})
    },
    getInfo: function(){
        return axios.get("/api/users")
    },
    updateEvent: function(eventData, userData){
        return axios.put("/api/events/" + eventData.event.id, {events: eventData, user: userData})
    },
    deleteEvent: function(id, userData){
        return axios.delete("/api/events/" + id, { data: userData })
    },
    saveNote: function(noteData, userData){
        //console.log('api data: ', noteData)
        return axios.post("/api/notes", {notes: noteData, user: userData} )
    },
    addUser: function(userData){
        //console.log('API user data received: ', userData)
        return axios.post("/api/users", userData)
    }
}