import React from "react";
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CalendarMain from "./views/CalendarMain";
import Notes from "./views/Notes";
import Footer from './components/Footer';
import Events from './views/Events';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <NavBar />
          <div className="container">
            <Switch>
              <Route exact path='/CalendarMain'>
                <CalendarMain />
              </Route>
              <Route path='/Notes'>
                <Notes />
              </Route>
              <Route path='/Events'>
                <Events />
              </Route>
            </Switch>
          </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

