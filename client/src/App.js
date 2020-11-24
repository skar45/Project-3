import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function App(){
  
  const [events, setEvents] = useState([{
    start: moment().toDate(),
    end: moment()
      .add(1, "days")
      .toDate(),
    title: "Some title"
  }])

  return (
    <div className="App">
      <h1>Good Morning, Dailey!</h1>
      <div className="container">
        <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
      </div>
      
    </div>
  );
  
}

export default App;
