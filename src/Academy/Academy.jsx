import React, { useMemo, useState } from "react";
import "./Academy.css";

import AcademyJSON from "../Academy.json";
import thumb1 from "../HomePage/QA/Poster/HP_1.jpg";
import thumb2 from "../HomePage/QA/Poster/HP_2.jpg";

const FILTERS = ["All", "Stocks", "ETFs", "Crypto", "NFTs"];

const Academy = () => {
  const allItems = useMemo(() => {
    return (AcademyJSON?.sections || []).flatMap((section) =>
      (section?.topics || []).map((t) => ({
        ...t,
        sectionTitle: section.title,
        sectionPrice: section.sectionPrice,
      }))
    );
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");
  const items = activeFilter === "All" ? allItems : allItems; // визуально, без фильтрации данных

  const newPlaylist = items.slice(0, 4);
  const trending = items.slice(4, 8);

  const getThumb = (index) => (index % 2 === 0 ? thumb1 : thumb2);

  return (
    <div className="academyPage">
      <div className="academyTop">
        <button type="button" className="academyBack">
          <span className="academyBackArrow">‹</span> Academy
        </button>

        <div className="academyFilters" role="tablist" aria-label="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`academyFilter ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="academySection">
        <div className="academySectionHeader">
          <div className="academySectionTitle">New Playlist</div>
          <div className="academySeeAll">See all</div>
        </div>
        <div className="academyRowLarge" role="list">
          {newPlaylist.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="academyLargeCard" role="listitem">
              <div className="academyLargeCardMedia">
                <img src={getThumb(idx)} alt="thumb" />
                <div className="academyBadge">Earn 2T</div>
              </div>
              <div className="academyLargeCardBottom">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="academySection academySection--trending">
        <div className="academySectionHeader">
          <div className="academySectionTitle">Trending</div>
          <div className="academySeeAll">See all</div>
        </div>
        <div className="academyRowSmall" role="list">
          {trending.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="academySmallCard" role="listitem">
              <div className="academySmallCardMedia">
                <img src={getThumb(idx + 1)} alt="thumb" />
                <div className="academyBadge academyBadge--small">Earn 2T</div>
              </div>
              <div className="academySmallCardBottom">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academy;
