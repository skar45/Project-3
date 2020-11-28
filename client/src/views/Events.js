import React, { useState, useEffect } from "react";
import Duckie from "../components/assets/Duckie.png";
import Ocean from "../components/assets/Ocean.png";
import moment from 'moment'

function Events(props) {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    timeOfDay()
  }, [])

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
    <div>
      <div className="container">
        <h1>{greeting}, Dailey</h1>
        <h3 className="text-muted">{moment().format("[Today is] dddd, MMMM Do YYYY")}</h3>
      </div>
      
      <div className="duckContainer">
        <img className="duckie" src={Duckie} alt="" />
        <img className="ocean" src={Ocean} alt="" />
	    </div>
  </div>
    )
}
  
  export default Events;


