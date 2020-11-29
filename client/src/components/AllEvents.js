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
                  <div className="card text-center rounded-lg">
                    <div className="card-header">
                      Start: {event.start}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text"></p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                    <div className="card-footer text-muted">
                      End: {event.end}
                    </div>
                  </div>
                )
              })
            : <h4>No Results to Display</h4>
            }
            </ul>
            
        </section>
    )
}

export default AllEvents