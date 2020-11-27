/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

export default {
    addEvent: function(eventData){
        //console.log('API add event retrieved data: ', eventData)
        return axios.get("/api/events", eventData)
    },
    getEvents: function(){
        return axios.get("/api/events")
    },
    updateEvent: function(id, eventData){
        return axios.put("/api/events" + id, eventData)
    },
    deleteEvent: function(id){
        return axios.delete("/api/events" + id)
    }
}