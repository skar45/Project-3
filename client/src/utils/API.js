/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {
    // pull all events from the database
    getEvents: function(){
        return axios.get("/api/events")
    },
    // add new event to the database
    addEvent: function(eventData){
        console.log('[API.addEvent] function reached ... Data received: ', eventData)
        //return axios.post("/api/events", eventData)
    },

    // TODO: may need to send updated data
    updateEvent: function(id){
        return axios.put("/api/events" + id)
    },
    // remove event from the database
    deleteEvent: function(id){
        return axios.delete("/api/events" + id)
    },
}