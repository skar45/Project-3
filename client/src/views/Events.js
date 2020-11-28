import React from "react";
import Duckie from "../components/assets/Duckie.png";
import Ocean from "../components/assets/Ocean.png";
import './styles.css'

function Events(props) {
    return (
    <div>
      <div className="duckContainer">
        <img className="duckie" src={Duckie} alt="" />
        <img className="ocean" src={Ocean} alt="" />
	    </div>
  </div>
    )
}
  
  export default Events;


