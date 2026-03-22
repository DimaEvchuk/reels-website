import React, { useEffect, useRef, useState } from "react";
import "./PosterCountdown.css";

const R = 53.5;
const CX = 55.5;
const CY = 55.5;
const CIRC = 2 * Math.PI * R;

function formatMmSs(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const PosterCountdown = ({ durationSeconds = 20 * 60, onComplete }) => {
  const [remaining, setRemaining] = useState(durationSeconds);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setRemaining(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(id);
          return 0;
        }
        if (prev === 1) {
          clearInterval(id);
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [durationSeconds]);

  const progress =
    durationSeconds > 0 ? Math.min(1, Math.max(0, remaining / durationSeconds)) : 0;
  const dashOffset = CIRC * (1 - progress);

  const ariaLabel =
    remaining <= 0
      ? "Time is up"
      : `${formatMmSs(remaining)} remaining`;

  return (
    <div
      className="poster-countdown"
      role="timer"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div className="poster-countdown__ring">
        <svg
          className="poster-countdown__svg"
          width="111"
          height="111"
          viewBox="0 0 111 111"
          aria-hidden
        >
          <circle
            className="poster-countdown__track"
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
          />
          <circle
            className="poster-countdown__progress"
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${CX} ${CY})`}
          />
        </svg>
        <div className="poster-countdown__text">
          <span className="poster-countdown__time">{formatMmSs(remaining)}</span>
          <span className="poster-countdown__label">time left</span>
        </div>
      </div>
    </div>
  );
};

export default PosterCountdown;
