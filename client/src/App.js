import React, { useState } from "react";
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react'

import CalendarMain from "./views/CalendarMain"



import Notes from "./views/Notes"
import Footer from './components/Footer';


import config from './config';
import Home from './Home';

// import Messages from './Messages';
// import Navbar from './Navbar';
// import Profile from './Profile';

const oktaAuth = new OktaAuth(config.oidc);

function App() {
  const history = useHistory(); // example from react-router

  const customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history.push('/');
  };
  
  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
    >
    
      <div>
        <NavBar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login/callback" component={LoginCallback} />
              <Route exact path='/CalendarMain'>
                <CalendarMain />
              </Route>
              <Route path='/Notes'>
                <Notes />
              </Route>
            </Switch>
          </div>
        <Footer />
      </div>
    
    </Security>
  );
}

export default App;
