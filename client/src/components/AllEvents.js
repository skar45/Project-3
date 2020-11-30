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
        // console.log('getEvents home :', eventsData.data)
        // TODO: error handling
        console.log('currentUserData=', currentUserData[0])
        setEvents(currentUserData[0].events)
    }

    function convertISO(date){
        if(date){
            // let startStr = date.replace(/T.*$/, '')
            // return startStr
            return moment().format(date)
        } else{
            return 'sorry pal'
        }
        
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
                      <a href="/CalendarMain" className="btn btn-primary">Go somewhere</a>
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