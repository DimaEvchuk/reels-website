import React from "react";
import "./RecentsEvents.css";
import EventsJSON from "./Events.json";
import speaker1 from "./speaker1.png";
import speaker2 from "./speaker2.png";

const RecentsEvents = () => {
  const getSpeakerImg = (photoSpeaker) => {
    if (typeof photoSpeaker !== "string") return speaker1;
    if (photoSpeaker.toLowerCase().includes("speaker2")) return speaker2;
    return speaker1;
  };

  return (
    <div className="allBlockEvent">
      {EventsJSON.map((event, index) => (
        <div key={index} className="blockEvent">
          <div className="person">
            <div className="speaker">
              <div className="photo">
                <img
                  src={getSpeakerImg(event.photoSpeaker)}
                  alt="speaker"
                />
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
                <p>Sold out:</p>
                {event.ticets
                  ? Math.round((event.participants / event.ticets) * 100) + "%"
                  : "0%"}
              </div>
            </div>
          </div>
          <div className="footerBlock">
            <div className="dateEvent">
              <p>{event.dateEvents.split(",")[0].trim()}:</p>
              {event.dateEvents.split(",")[1]?.trim()}
            </div>
            <div className="btnBook">Book Class</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentsEvents;
