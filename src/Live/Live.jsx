import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import "./Live.css";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal.jsx";
import AcademyJSON from "../Academy.json";
import BlinksCoinIcon from "../HomePage/Blinks/BlinksCoinIcon.jsx";

const VIDEO_SRC = "/Reels/rells1.mp4";

const formatTime = (sec) => {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const Live = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);

  const episodes = useMemo(() => {
    return (AcademyJSON?.sections || []).flatMap((section) =>
      (section?.topics || []).map((t) => ({
        ...t,
        sectionTitle: section.title,
      }))
    );
  }, []);

  const passedIndex =
    typeof location.state?.activeIndex === "number"
      ? location.state.activeIndex
      : 0;
  const activeIndex = Math.min(
    Math.max(0, passedIndex),
    Math.max(0, episodes.length - 1)
  );
  const active = episodes[activeIndex] || null;
  const stateTitle =
    typeof location.state?.title === "string"
      ? location.state.title.trim()
      : "";
  const playlistStart =
    typeof location.state?.playlistStart === "number" &&
    location.state.playlistStart >= 0
      ? location.state.playlistStart
      : 0;
  const playlistLen =
    typeof location.state?.playlistLength === "number" &&
    location.state.playlistLength >= 1
      ? Math.floor(location.state.playlistLength)
      : null;

  const totalSlides =
    playlistLen != null
      ? playlistLen
      : episodes.length > 0
        ? episodes.length
        : 3;
  const slideNum =
    playlistLen != null
      ? Math.min(
          Math.max(1, activeIndex - playlistStart + 1),
          playlistLen
        )
      : episodes.length > 0
        ? Math.min(activeIndex + 1, totalSlides)
        : 1;
  const progressPct = totalSlides > 0 ? (slideNum / totalSlides) * 100 : 33;

  const [currentSec, setCurrentSec] = useState(0);
  const [durationSec, setDurationSec] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => setCurrentSec(v.currentTime);
    const onMeta = () => setDurationSec(v.duration || 0);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("durationchange", onMeta);

    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("durationchange", onMeta);
    };
  }, [activeIndex]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/watch");
  };

  const instructorHandle = active?.instructor
    ? `@${String(active.instructor).replace(/^@/, "")}`
    : "@slava";

  const caption = stateTitle || active?.title || "What is investment?";

  return (
    <div className="livePage">
      <button
        type="button"
        className="liveBack"
        onClick={handleBack}
        aria-label="Назад"
      >
        ‹
      </button>

      <ScrollReveal className="liveStageReveal" variant="fade-up" delayMs={80}>
      <div className="liveStage">
        <div className="livePhone">
          <div className="liveVideoWrap">
            <video
              ref={videoRef}
              className="liveVideo"
              src={VIDEO_SRC}
              loop
              muted
              playsInline
            />
            <div className="liveVideoShade" />

            <div
              className="liveProgressRing"
              style={
                {
                  "--live-ring-pct": `${progressPct}%`,
                }
              }
              aria-hidden
            >
              <span className="liveProgressRing__label">
                {slideNum}/{totalSlides}
              </span>
            </div>

            <div className="liveRail" aria-hidden>
              <div className="liveRail__item">
                <BlinksCoinIcon width={28} height={24} />
                <span className="liveRail__label">12T</span>
              </div>
              <button type="button" className="liveRail__btn" aria-label="Нравится">
                <FavoriteBorderIcon sx={{ fontSize: 28 }} />
              </button>
              <button type="button" className="liveRail__btn" aria-label="Сохранить">
                <BookmarkBorderIcon sx={{ fontSize: 26 }} />
              </button>
            </div>

            <div className="liveBottomMeta">
              <div className="liveAvatar" aria-hidden />
              <div className="liveBottomMeta__text">
                <div className="liveHandle">{instructorHandle}</div>
                <div className="liveCaption">{caption}</div>
              </div>
            </div>

            <div className="liveSeekRow">
              <div className="liveSeekTrack">
                <div
                  className="liveSeekFill"
                  style={{
                    width: durationSec
                      ? `${Math.min(100, (currentSec / durationSec) * 100)}%`
                      : "35%",
                  }}
                />
                <div
                  className="liveSeekThumb"
                  style={{
                    left: durationSec
                      ? `${Math.min(100, (currentSec / durationSec) * 100)}%`
                      : "35%",
                  }}
                />
              </div>
              <span className="liveSeekTime">{formatTime(currentSec)}</span>
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
};

export default Live;
