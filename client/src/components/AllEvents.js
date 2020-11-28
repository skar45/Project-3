import React, {useState, useEffect} from 'react'
import API from '../utils/API'

function AllEvents(){
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents()
    },[])

    async function getEvents(){
        let eventsData = await API.getEvents() 
        console.log('getEvents home :', eventsData.data)
        setEvents(eventsData.data)
    }

    return (
        <section>
            <h2>Upcoming Events ({events.length})</h2>
            <ul>{events.length ?
            events.map((user) => {
                return(
                    <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                      <h5 className="card-title">{user.events.title}</h5>
                      <p className="card-text">{user.events.start}</p>
                      <a href="/CalendarMain" className="btn btn-primary">View in Calendar</a>
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