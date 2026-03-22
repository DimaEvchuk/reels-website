import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AcademyView.css";
import AcademyJSON from "../../Academy.json";

const ACADEMY_VIDEO_SRC = "/Reels/reells2.webm";
const PLAYLIST_CHUNK = 4;

const AcademyView = () => {
  const navigate = useNavigate();
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

  const goWatch = (index, title) => {
    const playlistStart = Math.floor(index / PLAYLIST_CHUNK) * PLAYLIST_CHUNK;
    const reelIndex = index - playlistStart;
    navigate("/watch", {
      state: { reelIndex, playlistStart, title },
    });
  };

  return (
    <section className="AcademyView">
      <div className="academyHeader">
        <div className="academyTitle">Academy</div>
        <button
          type="button"
          className="seeAll"
          onClick={() => navigate("/academy")}
        >
          See All
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.62484 12.3944C5.43735 12.2191 5.33203 11.9815 5.33203 11.7337C5.33203 11.4859 5.43735 11.2482 5.62484 11.073L8.91807 7.99566L5.62484 4.91834C5.44267 4.7421 5.34187 4.50604 5.34415 4.26102C5.34642 4.01599 5.4516 3.78161 5.63702 3.60834C5.82244 3.43508 6.07327 3.3368 6.33549 3.33467C6.5977 3.33254 6.85032 3.42673 7.03894 3.59696L11.0392 7.33497C11.2267 7.51021 11.332 7.74786 11.332 7.99566C11.332 8.24346 11.2267 8.48111 11.0392 8.65635L7.03894 12.3944C6.8514 12.5696 6.59707 12.668 6.33189 12.668C6.06671 12.668 5.81238 12.5696 5.62484 12.3944Z"
              fill="#8D5DDA"
            />
          </svg>
        </button>
      </div>

      <div className="academyRow" role="group" aria-label="Academy">
        {visibleTopics.map((topic, index) => (
          <div
            key={`${topic.title}-${index}`}
            className="academyCard"
            role="button"
            tabIndex={0}
            aria-label={`Открыть урок: ${topic.title}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => goWatch(index, topic.title)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goWatch(index, topic.title);
              }
            }}
          >
            <div className="academyCard__media">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={ACADEMY_VIDEO_SRC}
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
