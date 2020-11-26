import React, { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../utils/event-utils";
import API from '../utils/API'

export default function CalendarMain() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

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

  async function addEvents(response){
    let newEvent = {
      id: response.event.id,
      title: response.event.title,
      start: response.event.start,
      end: response.event.end,
      allDay: response.event.allDay
    }
    let result = await API.addEvent(newEvent)
    // console.log(result)
  }

  return (
    <div className="App">
      <RenderSidebar handleWeekendsToggle={handleWeekendsToggle} weekendsVisible={weekendsVisible} currentEvents={currentEvents}/>
      <div className="container">
        <h1>Good Morning, Dailey</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initalView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // or use 'events' setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          // FIXME: send to db
          eventAdd={(response) => addEvents(response)}
          eventChange={(response) => console.log('[eventChange] result: ', response) }
          eventRemove={(response) => console.log('[eventRemove] result: ', response) }

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
