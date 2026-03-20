import React, { useRef } from "react";
import "./Reels.css";
import AcademyJSON from "../../Academy.json";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const Reels = () => {
  const videoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const v = videoRefs.current[index];
    if (!v) return;
    // Ignore play errors caused by browser autoplay policies.
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  const handleMouseLeave = (index) => {
    const v = videoRefs.current[index];
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <>
      <div className="data-display">
        {AcademyJSON.sections.map((section, index) => (
          <div
            className="data-display__section"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              src="/Reels/Rells1(360p21rfSocial).mp4"
              loop
              muted
            />
            <div className="data-display__section-video-overlay"></div>
            <div className="data-display__section-block">
              <p className="data-display__section-price">
                Earn {section.sectionPrice}
              </p>
              <p className="data-display__section-icon">
                <SchoolOutlinedIcon style={{ color: "white" }} />
              </p>
            </div>
            <p className="data-display__section-title">{section.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reels;
