import React, { useRef } from "react";
import "./Reels.css";
import AcademyJSON from "../../Academy.json";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const Reels = () => {
  const videoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    videoRefs.current[index].play();
  };

  const handleMouseLeave = (index) => {
    videoRefs.current[index].pause();
    videoRefs.current[index].currentTime = 0;
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
              speed="500"
            />
            <div class="data-display__section-video-overlay"></div>
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
