import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./Watch.css";

import AcademyJSON from "../Academy.json";
import BlinksCoinIcon from "../HomePage/Blinks/BlinksCoinIcon.jsx";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal.jsx";

const PLAYLIST_CHUNK = 4;

/** Разные превью/плеер по уроку: цикл из доступных в проекте роликов */
const REEL_VIDEO_POOL = [
  "/Reels/rells1.mp4",
  "/Reels/reells2.webm",
  "/Reels/Rells1(360p21rfSocial).mp4",
];

const reelSrcForGlobalIndex = (globalIndex) =>
  REEL_VIDEO_POOL[Math.abs(globalIndex) % REEL_VIDEO_POOL.length];

/** 1–2 буквы для аватара: заглавные в нике или первые символы */
const getInstructorInitials = (raw) => {
  const s = String(raw ?? "")
    .replace(/^@/, "")
    .trim();
  if (!s) return "?";
  const caps = s.match(/[A-ZА-ЯЁ]/g);
  if (caps && caps.length >= 2) {
    return `${caps[0]}${caps[1]}`.toUpperCase();
  }
  if (caps && caps.length === 1) {
    return caps[0].toUpperCase();
  }
  const alnum = s.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, "");
  if (alnum.length >= 2) {
    return `${alnum[0]}${alnum[1]}`.toUpperCase();
  }
  return (alnum[0] || s[0] || "?").toUpperCase();
};

const Watch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const allItems = useMemo(() => {
    return (AcademyJSON?.sections || []).flatMap((section) =>
      (section?.topics || []).map((t) => ({
        ...t,
        sectionTitle: section.title,
        sectionPrice: section.sectionPrice,
      }))
    );
  }, []);

  const playlistStart = useMemo(() => {
    const raw = location.state?.playlistStart;
    if (typeof raw !== "number" || raw < 0 || !Number.isFinite(raw)) return 0;
    return Math.min(raw, Math.max(0, allItems.length - 1));
  }, [location.key, location.state?.playlistStart, allItems.length]);

  const episodes = useMemo(() => {
    return allItems.slice(playlistStart, playlistStart + PLAYLIST_CHUNK);
  }, [allItems, playlistStart]);

  const [activeIndex, setActiveIndex] = useState(0);
  const thumbVideoRefs = useRef([]);

  useEffect(() => {
    const ri = location.state?.reelIndex;
    const max = Math.max(0, episodes.length - 1);
    if (typeof ri === "number" && ri >= 0) {
      setActiveIndex(Math.min(ri, max));
    } else {
      setActiveIndex(0);
    }
  }, [location.key, location.state?.reelIndex, episodes.length]);

  useEffect(() => {
    thumbVideoRefs.current.forEach((v, idx) => {
      if (!v || typeof v.play !== "function") return;
      if (idx === activeIndex) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [activeIndex, episodes.length]);

  const active = episodes[activeIndex] || episodes[0];
  const displayTitle = active?.title;
  const activeGlobalIndex = playlistStart + activeIndex;
  const mainVideoSrc = reelSrcForGlobalIndex(activeGlobalIndex);

  const totalReels = Math.max(1, episodes.length);
  const currentReel = Math.min(activeIndex + 1, totalReels);
  const ringPct = (currentReel / totalReels) * 100;

  const handleSkip = () => {
    if (episodes.length === 0) return;
    setActiveIndex((i) => (i + 1) % episodes.length);
  };

  const handleNext = () => {
    if (episodes.length === 0) return;
    setActiveIndex((i) => (i + 1) % episodes.length);
  };

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  if (episodes.length === 0) {
    return <div className="watchLivePage" />;
  }

  return (
    <div className="watchLivePage">
      <ScrollReveal variant="fade-up">
      <div className="watchLiveTop">
        <button
          type="button"
          className="watch_back"
          onClick={handleBack}
          aria-label="Back"
        >
          ← Back
        </button>
        <button type="button" className="watchSkipTop" onClick={handleSkip}>
          Skip
        </button>
      </div>
      </ScrollReveal>

      <div className="watchLiveLayout">
        <ScrollReveal className="watchPlayerReveal" variant="fade-up" delayMs={40}>
        <div className="watchPlayer">
          <div className="watchPlayerFrame">
            <video
              key={mainVideoSrc}
              className="watchPlayerVideo"
              src={mainVideoSrc}
              autoPlay
              muted
              loop
              playsInline
            />

            <div
              className="watchPlayerCount"
              style={{ "--watch-ring-pct": `${ringPct}%` }}
              aria-hidden
            >
              <span className="watchPlayerCount__label">
                {currentReel}/{totalReels}
              </span>
            </div>

            <div className="watchPlayerMeta">
              <div className="watchPlayerMetaTitle">{displayTitle}</div>
              <div className="watchPlayerMetaDesc">{active?.sectionTitle}</div>
            </div>

            <div
              className="watchPlayerActions"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <button type="button" className="watchBtn watchBtnGhost" onClick={handleSkip}>
                Skip
              </button>
              <button type="button" className="watchBtn watchBtnPrimary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
        </ScrollReveal>

        <aside
          className={`watchEpisodeList${episodes.length > 3 ? " watchEpisodeList--scroll" : ""}`}
          aria-label="Уроки плейлиста"
        >
          {episodes.map((ep, idx) => {
            const isActive = idx === activeIndex;
            const globalIdx = playlistStart + idx;
            const thumbSrc = reelSrcForGlobalIndex(globalIdx);
            const instructorLogin = ep.instructor
              ? String(ep.instructor).replace(/^@/, "")
              : "slava";
            const handle = `@${instructorLogin}`;
            const initials = getInstructorInitials(instructorLogin);
            return (
              <ScrollReveal
                key={`${globalIdx}-${ep.title}`}
                variant="slide-left"
                delayMs={idx * 50}
              >
              <button
                type="button"
                className={`watchEpisodeCard ${isActive ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="watchEpisodeThumb">
                  <video
                    ref={(el) => {
                      thumbVideoRefs.current[idx] = el;
                    }}
                    className="watchEpisodeThumbVideo"
                    src={thumbSrc}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden
                  />
                </div>
                <div className="watchEpisodeMain">
                  <div className="watchEpisodeTopRow">
                    <div className="watchEpisodeCreator">
                      <span
                        className="watchEpisodeCreatorAvatar"
                        aria-hidden
                      >
                        {initials}
                      </span>
                      <span className="watchEpisodeCreatorName">{handle}</span>
                    </div>
                    <div className="watchEpisodeBadge">
                      <BlinksCoinIcon width={18} height={16} />
                      <span>Earn 2T</span>
                    </div>
                  </div>
                  <div className="watchEpisodeTitle">
                    {idx + 1}. {ep.title}
                  </div>
                  <p className="watchEpisodeDesc">{ep.description}</p>
                  <div className="watchEpisodeTime">
                    <AccessTimeIcon className="watchEpisodeTimeIcon" fontSize="inherit" />
                    <span>{(idx + 1) * 2} min</span>
                  </div>
                </div>
              </button>
              </ScrollReveal>
            );
          })}
        </aside>
      </div>
    </div>
  );
};

export default Watch;
