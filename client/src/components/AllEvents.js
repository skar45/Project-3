import React, {useState, useEffect} from 'react'
import API from '../utils/API'
import moment from 'moment'
import axios from 'axios'

export default function AllEvents(props){
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
        if (currentUserData[0]){
            //console.log('currentUserData=', currentUserData[0])
            //console.log('Prepare to set events', currentUserData[0].events)
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
    async function twilioReq(msg,time){
      const result = await fetch('http://localhost:3000/api/twilio',{method:'POST', headers:{'Content-Type': 'application/json'},body:JSON.stringify({message: msg, number:'6478638146'})})
    }

    function sendMail(event){
      axios({
        method: "POST",
        url: "https://api.sendgrid.com/v3/mail/send",
        headers: {
          "content-type": "application/json",
          authorization:
          "Bearer " + process.env.SENDGRID_API_KEY,
          },
          data: {
              personalizations: [
                  {
                  to: [{ email: props.user.email, name: (props.user.given_name + ' ' + props.user.family_name) }],
                  dynamic_template_data: {
                  given_name: props.user.given_name,
                  title: event.title,
                  start: event.start,
                  end: event.end,
                  },
                  subject: "Reminder!",
                  },
              ],
              from: { email: "teamproducky@gmail.com", name: "Producky Team" },
              reply_to: { email: "teamproducky@gmail.com", name: "Producky Team" },
              template_id: "d-587a743d18654942b4d54c1e45def243",
          },
          json: true,
      })
  };


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
                      <a href="#" className="btn btn-primary" onClick={()=>sendMail(event)}>Set Reminder</a>

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