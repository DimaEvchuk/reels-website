import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Academy.css";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal.jsx";

import AcademyJSON from "../Academy.json";

const FILTERS = ["All", "Stocks", "ETFs", "Crypto", "NFTs"];
const ACADEMY_VIDEO_SRC = "/Reels/reells2.webm";
/** Длина «рилс»-плейлиста в Watch (как у newPlaylist). */
const PLAYLIST_CHUNK = 4;

const Academy = () => {
  const navigate = useNavigate();
  const videoRefs = useRef([]);

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

  const goToAcademyTab = () => {
    navigate("/academy");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goWatch = (globalIndex) => {
    const item = allItems[globalIndex];
    const playlistStart =
      Math.floor(globalIndex / PLAYLIST_CHUNK) * PLAYLIST_CHUNK;
    const reelIndex = globalIndex - playlistStart;
    navigate("/watch", {
      state: {
        reelIndex,
        playlistStart,
        title: item?.title,
      },
    });
  };

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
    <div className="academyPage">
      <ScrollReveal className="academyTopReveal" variant="fade-up">
      <div className="academyTop">
        <button
          type="button"
          className="academy_back"
          onClick={() => navigate("/")}
          aria-label="Back to Home"
        >
          ← Back
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
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delayMs={60}>
      <div className="academySection">
        <div className="academySectionHeader">
          <div className="academySectionTitle">New Playlist</div>
          <button type="button" className="academySeeAll" onClick={goToAcademyTab}>
            See all
          </button>
        </div>
        <div className="academyRowLarge" role="group" aria-label="New Playlist">
          {newPlaylist.map((item, idx) => (
            <ScrollReveal key={`${item.title}-${idx}`} variant="scale" delayMs={idx * 55}>
            <div
              className="academyLargeCard"
              role="button"
              tabIndex={0}
              aria-label={`Открыть урок: ${item.title}`}
              onClick={() => goWatch(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goWatch(idx);
                }
              }}
            >
              <div
                className="academyLargeCardMedia"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={ACADEMY_VIDEO_SRC}
                  loop
                  muted
                  playsInline
                />
                <div className="academyBadge">Earn 2T</div>
              </div>
              <div className="academyLargeCardBottom">{item.title}</div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delayMs={40}>
      <div className="academySection academySection--trending">
        <div className="academySectionHeader">
          <div className="academySectionTitle">Trending</div>
          <button type="button" className="academySeeAll" onClick={goToAcademyTab}>
            See all
          </button>
        </div>
        <div className="academyRowLarge" role="group" aria-label="Trending">
          {trending.map((item, idx) => {
            const refIndex = newPlaylist.length + idx;
            return (
              <ScrollReveal key={`${item.title}-${idx}`} variant="scale" delayMs={idx * 55}>
              <div
                className="academyLargeCard"
                role="button"
                tabIndex={0}
                aria-label={`Открыть урок: ${item.title}`}
                onClick={() => goWatch(refIndex)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goWatch(refIndex);
                  }
                }}
              >
                <div
                  className="academyLargeCardMedia"
                  onMouseEnter={() => handleMouseEnter(refIndex)}
                  onMouseLeave={() => handleMouseLeave(refIndex)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[refIndex] = el;
                    }}
                    src={ACADEMY_VIDEO_SRC}
                    loop
                    muted
                    playsInline
                />
                <div className="academyBadge">Earn 2T</div>
              </div>
              <div className="academyLargeCardBottom">{item.title}</div>
              </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
};

export default Academy;
