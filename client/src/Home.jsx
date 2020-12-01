/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import Producky from './components/assets/Producky.png'


const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
 
  const login = async () => {
    oktaAuth.signInWithRedirect('/login');
  }
  const logout = async () => oktaAuth.signOut('/login');
  console.log('oktaAuth: ',oktaAuth)
  if(authState.isPending) {
    return <div>Loading...</div>;
  }
 
  if(!authState.isAuthenticated) {
    localStorage.clear()
    return (
      <div className="container-fluid loginContainer">
        <div className="logo-container">
          <img className="logo" src={Producky} alt="Producky logo" />
        </div>
        <div className="loginBox">
          <p>Not Logged in yet</p>
          <button onClick={login} type="button" className="btn btn-light">Login</button>
        </div>
      </div>
    );
  }
  oktaAuth.getUser().then((info) => {
    localStorage.setItem('user', info.email)
  });
  
  return (
    <div className="container-fluid loginContainer">
      <div className="logo-container">
          <img className="logo" src={Producky} alt="Producky logo" />
        </div>
      <div className="loginBox">
        <p>Logged in!</p>
        <button onClick={logout} type="button" className="btn btn-light">Logout</button>
      </div>  
    </div>
  );
};
 

export default Home;
