import React, { useState, useEffect, useContext } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";
import API from '../utils/API'
import {UserContext} from '../UserContext'
import { v4 as uuidv4 } from 'uuid'


export default function CalendarMain() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [eventList, setEventList] = useState([])
  const {userInfo, setUserInfo} = useContext(UserContext)
  const [userEmail, setUserEmail] = useState("")
  const loggedUser = localStorage.getItem('user')

  useEffect(() => {
    getEvents()
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
        id: uuidv4(),
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
    let result = await API.addEvent(newEvent, loggedUser)
  }

  async function getEvents(){
    let result = await API.getInfo()
    if (result.data){
      let currentUserData = result.data.filter(user => user.email === loggedUser)
      console.log('[currentUserData]:', result.data)
      if (currentUserData[0].events){
        setEventList(currentUserData[0].events)
      }
      
    }
    

  }

  async function updateEvent(data){
    let result = await API.updateEvent(data, loggedUser)
  }

  async function deleteEvent(data){
    let result = await API.deleteEvent(data.event.id)
  }

  return (
    <div className="App">
      <div className="container">
        <RenderSidebar handleWeekendsToggle={handleWeekendsToggle} weekendsVisible={weekendsVisible} currentEvents={currentEvents}/>
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
          <input type="checkbox" checked={props.weekendsVisible} onChange={props.handleWeekendsToggle} /> Toggle Weekends
        </label>
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
