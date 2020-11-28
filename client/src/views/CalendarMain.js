import React, { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";
import API from '../utils/API'
import moment from 'moment'


export default function CalendarMain() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [eventList, setEventList] = useState([])
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    getEvents()
    timeOfDay()
  }, [])

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clears date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo) {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  async function addEvents(data){
    let newEvent = {
      id: data.event.id,
      title: data.event.title,
      start: data.event.start,
      end: data.event.end,
      allDay: data.event.allDay
    }
    // console.log(data)
    let result = await API.addEvent(newEvent)
  }

  // TODO: send to utils
  async function getEvents(){
    //console.log('Hello')
    let result = await API.getEvents()
    console.log('[getEvents]:', result.data)
    setEventList(result.data)
  }

  async function updateEvent(data){
    let result = await API.updateEvent(data)
  }

  async function deleteEvent(data){
    let result = await API.deleteEvent(data.event.id)
  }

  function timeOfDay(){
    let currentTime = Number(moment().format("H"))
    if(currentTime >= 0 && currentTime < 12){
      setGreeting("Good Morning")
    } else if (currentTime >= 12 && currentTime < 17){
      setGreeting("Good Afternoon")
    }else if (currentTime > 17){
      setGreeting("Good Evening")
    } 
  }

  return (
    <div className="App">
      <div className="container">
        <RenderSidebar handleWeekendsToggle={handleWeekendsToggle} weekendsVisible={weekendsVisible} currentEvents={currentEvents}/>
        <h1>{greeting}, Dailey</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          footerToolbar={{
            left: "",
            center: "dayGridMonth,timeGridWeek,timeGridDay",
            right: "",
          }}
          initalView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={eventList} //TODO: or use 'events' setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventAdd={(response) => addEvents(response)}
          eventChange={(response) => updateEvent(response)}
          eventRemove={(response) => deleteEvent(response)}
        />
      </div>
    </div>
  );
}

function RenderSidebar(props) {
  return (
    <div>
      <div>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
        </ul>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={props.weekendsVisible} onChange={props.handleWeekendsToggle} />toggle weekends
        </label>
      </div>
      <div>
        <h2>All Events ({props.currentEvents.length})</h2>
        <ul>
          {props.currentEvents.map(renderSidebarEvent)}
        </ul>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
    </li>
  );
}
