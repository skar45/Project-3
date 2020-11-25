import React from "react";
import Card from "../components/Card"

function Notes(props) {
    return (
      <div>
          <div className="row">
            <div className="col-sm-6">
              <Card />
            </div>
            <div className="col-sm-6">
              <Card /> 
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Card /> 
            </div>
            <div className="col-sm-6">
              <Card /> 
            </div>
          </div>
        </div>
      
      
    );
  }
  
  export default Notes;

  