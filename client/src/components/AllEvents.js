import React, {useState, useEffect} from 'react'
import API from '../utils/API'

function AllEvents(){
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents()
    },[])

    async function getEvents(){
        let eventsData = await API.getEvents() 
        setEvents(eventsData.data)
    }

    return (
        <section>
            <h2>Upcoming Events</h2>
            <ul>{events.length ?
            events.map((event) => {
                return(
                <div class="card text-center">
                <div class="card-header">
                  Featured
                </div>
                <div class="card-body">
                  <h5 class="card-title">{event.title}</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                <div class="card-footer text-muted">
                  2 days ago
                </div>
              </div>)
              })
            : <h4>No Results to Display</h4>
            }
            </ul>
            
        </section>
    )
}

export default AllEvents