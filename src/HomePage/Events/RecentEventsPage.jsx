import React from "react";
import { useNavigate } from "react-router-dom";
import RecentEvents from "./RecentEvents";
import "./RecentEventsPage.css";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal.jsx";

function RecentEventsPage() {
  const navigate = useNavigate();

  return (
    <div className="recentEventsPage">
      <ScrollReveal variant="fade-up">
      <div className="recentEventsPage_top">
        <button
          type="button"
          className="recentEventsPage_back"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
      </div>
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delayMs={70}>
      <header className="recentEventsPage_header">
        <h1 className="recentEventsPage_title">All recent events</h1>
        <p className="recentEventsPage_subtitle">
          Full list of upcoming sessions — pick a class and book your place.
        </p>
      </header>
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delayMs={120}>
      <RecentEvents layout="grid" />
      </ScrollReveal>
    </div>
  );
}

export default RecentEventsPage;
