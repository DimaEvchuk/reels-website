import React from "react";
import "./HomePage.css";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal.jsx";
import QA from "./QA/QA.jsx";
import Events from "./Events/Events.jsx";
import AcademyView from "./AcademyView/AcademyView.jsx";
import Blinks from "./Blinks/Blinks.jsx";

const HomePage = () => {
  return (
    <div className="home">
      <div className="background">
        <div className="homePage">
          <ScrollReveal as="div" className="title" variant="fade" delayMs={0}>
            Community
          </ScrollReveal>
          <div className="blocks">
            <ScrollReveal variant="fade-up" delayMs={0}>
              <QA />
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delayMs={70}>
              <Events />
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delayMs={140}>
              <Blinks />
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delayMs={210}>
              <AcademyView />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
