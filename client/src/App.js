import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CalendarMain from "./views/CalendarMain";
import Note from "./views/Notes";
import NewNote from "./views/NewNote";
import NoteList from "./views/NoteList";
import NoteCounter from "./views/NoteCount";
import EditNote from "./views/EditNote";
import Footer from "./components/Footer";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/CalendarMain">
              <CalendarMain />
            </Route>
            <Route path="/NewNote">
              <NewNote />
            </Route>
            <Route path="/Notes">
              <Note />
            </Route>
            <Route path="/NoteList">
              <NoteList />
            </Route>
            <Route path="/NoteCount">
              <NoteCounter />
            </Route>
            <Route path="/EditNote">
              <EditNote />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
