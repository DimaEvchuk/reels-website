import React from "react";
import "./RecentsEvents.css";
import EventsJSON from "./Events.json";
import rr from "./speaker1.png";

const RecentsEvents = () => {
  return (
    <div className="allBlockEvent">
      {EventsJSON.map((event, index) => (
        <div key={index} className="blockEvent">
          {console.log(index)}
          <div className="person">
            <div className="speaker">
              <div className="photo">
                <img src={rr} alt="speaker" />
              </div>
              <div className="name">{event.nameSpeaker}</div>
            </div>
            <div className="price">
              <p>{event.priceSpeaker}</p>
            </div>
          </div>

          <div className="topic">
            <div className="titleEvent">{event.nameEvents}</div>
            <div className="subTitle">
              <div className="particalpants">
                <p>Participants:</p>
                {event.participants}
              </div>
              <div className="solidOut">
                <p>Sold out:</p>25%
              </div>
            </div>
          </div>
          <div className="footerBlock">
            <div className="dateEvent">
              <p>{event.dateEvents.split(",")[0]}:</p>
              {event.dateEvents.split(",")[1]}
            </div>
            <div className="btnBook">Book Class</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentsEvents;
