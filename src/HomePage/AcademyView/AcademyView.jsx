import React, { useRef } from "react";
import "./AcademyView.css";
import AcademyJSON from "../../Academy.json";

const AcademyView = () => {
  const videoRefs = useRef([]);

  const topics = (AcademyJSON?.sections || []).flatMap((section) =>
    (section?.topics || []).map((t) => ({
      ...t,
      sectionTitle: section.title,
      sectionPrice: section.sectionPrice,
    }))
  );

  // Match the amount seen in the screenshot: show first 6 items.
  const visibleTopics = topics.slice(0, 6);

  const handleMouseEnter = (index) => {
    const v = videoRefs.current[index];
    if (v && typeof v.play === "function") v.play();
  };

  const handleMouseLeave = (index) => {
    const v = videoRefs.current[index];
    if (v && typeof v.pause === "function") {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <section className="AcademyView">
      <div className="academyHeader">
        <div className="academyTitle">Academy</div>
        <div className="seeAll">See All</div>
      </div>

      <div className="academyRow" role="list">
        {visibleTopics.map((topic, index) => (
          <div
            key={`${topic.title}-${index}`}
            className="academyCard"
            role="listitem"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="academyCard__media">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src="/Reels/Rells1(360p21rfSocial).mp4"
                loop
                muted
                playsInline
              />
              <div className="academyCard__overlay" />
              <div className="academyCard__badge">Earn 2T</div>
            </div>

            <div className="academyCard__bottom">
              <div className="academyCard__name">{topic.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AcademyView;
