import React from "react";
import "./HomePage.css";
import QA from "./QA/QA.jsx";
import Events from "./Events/Events.jsx";
import AcademyView from "./AcademyView/AcademyView.jsx";
import Blinks from "./Blinks/Blinks.jsx";

const HomePage = () => {
  return (
    <div className="home">
      <div className="background">
        <div className="homePage">
          <div className="title">Сommunity</div>
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

export default HomePage;
