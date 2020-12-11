import React from "react";
 
function Card(props) {
  return (
    <div className="card portfolioCard">
          <img className="card-img-top" alt={props.project} src={props.img}/>
          <div className="card-body">
            <h5 className="card-title">{props.project}</h5>
            <p className="card-text">{props.dscrptn}</p>
          </div>
    </div>
    
  );
}

export default Card;