import React, { useMemo, useState } from "react";
import "./Watch.css";

import AcademyJSON from "../Academy.json";
import thumb1 from "../HomePage/QA/Poster/HP_1.jpg";
import thumb2 from "../HomePage/QA/Poster/HP_2.jpg";

const Watch = () => {
  const episodes = useMemo(() => {
    const items = (AcademyJSON?.sections || []).flatMap((section) =>
      (section?.topics || []).map((t) => ({
        ...t,
        sectionTitle: section.title,
        sectionPrice: section.sectionPrice,
      }))
    );

    // На макете видно 3-4 карточки. Берем первые 4.
    return items.slice(0, 4);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = episodes[activeIndex] || episodes[0];

  const handleSkip = () => {
    if (episodes.length === 0) return;
    setActiveIndex((i) => (i + 1) % episodes.length);
  };

  const handleNext = () => {
    if (episodes.length === 0) return;
    setActiveIndex((i) => (i + 1) % episodes.length);
  };

  const getThumb = (idx) => (idx % 2 === 0 ? thumb1 : thumb2);

  if (episodes.length === 0) {
    return <div className="watchLivePage" />;
  }

  return (
    <div className="watchLivePage">
      <div className="watchLiveTop">
        <div className="watchLiveTitle">
          <span className="watchBackArrow">‹</span> Academy
        </div>
        <button type="button" className="watchSkipTop" onClick={handleSkip}>
          Skip
        </button>
      </div>

      <div className="watchLiveLayout">
        <div className="watchPlayer">
          <div className="watchPlayerFrame">
            <video
              className="watchPlayerVideo"
              src="/Reels/rells1.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="watchPlayerGradient" />

            <div className="watchPlayerCount">
              {Math.min(activeIndex + 1, 3)}/{3}
            </div>

            <div className="watchPlayerMeta">
              <div className="watchPlayerMetaTitle">{active?.title}</div>
              <div className="watchPlayerMetaDesc">
                {active?.sectionTitle}
              </div>
            </div>

            <div className="watchPlayerActions">
              <button type="button" className="watchBtn watchBtnGhost" onClick={handleSkip}>
                Skip
              </button>
              <button type="button" className="watchBtn watchBtnPrimary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>

        <aside className="watchEpisodeList" aria-label="episodes">
          {episodes.map((ep, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={`${ep.title}-${idx}`}
                type="button"
                className={`watchEpisodeCard ${isActive ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="watchEpisodeMedia">
                  <img src={getThumb(idx)} alt="episode" />
                  <div className="watchEpisodeBadge">Earn 2T</div>
                </div>
                <div className="watchEpisodeBody">
                  <div className="watchEpisodeTitle">{ep.title}</div>
                  <div className="watchEpisodeDesc">{ep.description}</div>
                  <div className="watchEpisodeTime">{(idx + 1) * 2} min</div>
                </div>
              </button>
            );
          })}
        </aside>
      </div>
    </div>
  );
};

export default Watch;
