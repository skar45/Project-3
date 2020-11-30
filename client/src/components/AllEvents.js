import React, {useState, useEffect} from 'react'
import API from '../utils/API'
import moment from 'moment'

function AllEvents(props){
    const loggedUser = localStorage.getItem('user')
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents()
    },[])
    
    async function getEvents(){
        let eventsData = await API.getInfo() 
        console.log('props=', loggedUser)
        let currentUserData = eventsData.data.filter(user => user.email === loggedUser)
        console.log('currentUserData =', currentUserData)
        if (currentUserData !== 0){
            console.log('currentUserData=', currentUserData[0])
            console.log('Prepare to set events', currentUserData[0].events)
            setEvents(currentUserData[0].events)
        } else{
            console.log('No currentUserData')
        }
        
    }

    function convertISO(date){
        //var str = '2011-04-11T10:20:30Z';
        var parts = date.slice(0, -1).split('T');
        var dateComponent = parts[0];
        var timeComponent = parts[1];
        console.log('date', dateComponent);
        console.log('time', timeComponent);
        return dateComponent + ' ' + timeComponent
    }

    return (
        <section>
            <h2>Upcoming Events ({events.length})</h2>
            <ul>{events.length ?
            events.map((event) => {
                return(
                  <div className="card text-center rounded-lg">
                    <div className="card-header">
                      Start: {convertISO(event.start)}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text"></p>
                      <a href="/CalendarMain" className="btn btn-primary">View in Calendar</a>
                    </div>
                    <div className="card-footer text-muted">
                      End: {convertISO(event.end)}
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