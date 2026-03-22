import React from "react";
import "./Community.css";

import "../HomePage/HomePage.css";
import QA from "../HomePage/QA/QA.jsx";
import Events from "../HomePage/Events/Events.jsx";
import Blinks from "../HomePage/Blinks/Blinks.jsx";
import AcademyView from "../HomePage/AcademyView/AcademyView.jsx";

const Community = () => {
  return (
    <div className="home communityPage">
      <div className="background">
        <div className="homePage">
          <div className="title">Discover The Best In</div>
          <div className="blocks">
            <QA />
            <Events />
            <Blinks />
            <AcademyView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
