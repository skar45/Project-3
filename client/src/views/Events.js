import React, { useState, useEffect, useContext } from "react";
import Duckie from "../components/assets/Duckie.png";
import Ocean from "../components/assets/Ocean.png";
import moment from 'moment'
import { useOktaAuth } from '@okta/okta-react';
import AllEvents from '../components/AllEvents'
import './styles.css'
import API from "../utils/API";
import {UserContext} from '../UserContext'


function Events(props) {
  const [greeting, setGreeting] = useState("")
  const { authState, oktaAuth } = useOktaAuth();
  //const [userInfo, setUserInfo] = useState(null);
  const {userInfo, setUserInfo} = useContext(UserContext)

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        console.log('[okta getUser]: ', info)
        setUserInfo(info);
        sendLoginInfo(info)
      });
    }
    timeOfDay()
  }, [authState, oktaAuth, setUserInfo]); //FIXME: maybe remove setUserInfo

  async function sendLoginInfo(data){
    //console.log('Events page: ', data)
    let result = await API.addUser(data)
  }

  function timeOfDay(){
    let currentTime = Number(moment().format("H"))
    if(currentTime >= 0 && currentTime < 12){
      setGreeting("Good Morning")
    } else if (currentTime >= 12 && currentTime < 17){
      setGreeting("Good Afternoon")
    }else if (currentTime >= 17){
      setGreeting("Good Evening")
    } 
  }
    return (
    <div>
      <div className="container">
        <h1>{greeting}, {userInfo ? userInfo.given_name : ""}</h1>
        <h3 className="text-muted">{moment().format("[Today is] dddd, MMMM Do YYYY")}</h3>

        <AllEvents user={userInfo}/>
      </div>
      
      <div className="duckContainer">
        <img className="duckie" src={Duckie} alt="" />
        <img className="ocean" src={Ocean} alt="" />
	    </div>
  </div>
    )
}
  
  export default Events;


