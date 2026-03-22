import React, { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import "./EarningsQuizFlow.css";
import { QuizConfetti } from "./ConfettiAnimation.jsx";

const Q1_OPTIONS = [
  { id: "q1-a", text: "Probability is high" },
  { id: "q1-b", text: "There are thoughts that yes, but I do not think" },
  { id: "q1-c", text: "Absolutely not" },
];

const Q1_CORRECT = "q1-c";

const Q2_TILES = [
  { id: "t0", label: "ADA", hue: "#0033ad" },
  { id: "t1", label: "DOT", hue: "#e6007a" },
  { id: "t2", label: "SOL", hue: "#9945ff" },
  { id: "t3", label: "BTC", hue: "#f7931a", correct: true },
  { id: "t4", label: "XRP", hue: "#23292f" },
  { id: "t5", label: "ETH", hue: "#627eea" },
  { id: "t6", label: "MATIC", hue: "#8247e5" },
  { id: "t7", label: "LINK", hue: "#2a5ada" },
  { id: "t8", label: "AVAX", hue: "#e84142" },
];

function UniswapStyleUnicorn() {
  return (
    <svg
      className="earningsQuizFlow_unicorn"
      viewBox="0 0 80 88"
      width="80"
      height="88"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path fill="currentColor" stroke="none" d="M40 8l6 20h-12l6-20z" />
      <ellipse cx="40" cy="54" rx="26" ry="24" />
      <circle cx="30" cy="50" r="3" fill="currentColor" stroke="none" />
      <circle cx="50" cy="50" r="3" fill="currentColor" stroke="none" />
      <path d="M32 62c4 5 12 5 16 0" />
    </svg>
  );
}

function ProgressRing({ current, total }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const frac = current / total;
  const dash = frac * c;
  return (
    <div className="earningsQuizFlow_progressWrap">
      <svg className="earningsQuizFlow_progressSvg" viewBox="0 0 72 72" width="72" height="72">
        <circle className="earningsQuizFlow_progressTrack" cx="36" cy="36" r={r} />
        <circle
          className="earningsQuizFlow_progressFill"
          cx="36"
          cy="36"
          r={r}
          strokeDasharray={`${dash} ${c}`}
          transform="rotate(-90 36 36)"
        />
      </svg>
      <span className="earningsQuizFlow_progressLabel">
        {current}/{total}
      </span>
    </div>
  );
}

export function EarningsQuizFlow({ open, onClose }) {
  const [phase, setPhase] = useState("q1");
  const [q1Pick, setQ1Pick] = useState(null);
  const [q2Pick, setQ2Pick] = useState(null);
  const [score, setScore] = useState(0);

  const titleId = useId();
  const totalQuestions = 2;

  useEffect(() => {
    if (!open) return;
    setPhase("q1");
    setQ1Pick(null);
    setQ2Pick(null);
    setScore(0);
  }, [open]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  const finishQuiz = useCallback(() => {
    let pts = 0;
    if (q1Pick === Q1_CORRECT) pts += 1;
    const t = Q2_TILES.find((x) => x.id === q2Pick);
    if (t?.correct) pts += 1;
    setScore(pts);
    setPhase("done");
  }, [q1Pick, q2Pick]);

  const goNextFromQ1 = useCallback(() => {
    if (!q1Pick) return;
    setPhase("q2");
  }, [q1Pick]);

  if (!open) return null;

  const perfectScore = phase === "done" && score === totalQuestions;

  return createPortal(
    <div className="earningsQuizFlow_overlay" role="presentation">
      <QuizConfetti active={perfectScore} />
      <div
        className="earningsQuizFlow_panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={phase === "done" ? undefined : titleId}
      >
        <button
          type="button"
          className="earningsQuizFlow_close"
          onClick={onClose}
          aria-label="Close quiz"
        >
          ×
        </button>

        {phase === "q1" && (
          <>
            <h2 id={titleId} className="earningsQuizFlow_heading">
              What was he talking about?
            </h2>
            <div className="earningsQuizFlow_unicornWrap">
              <UniswapStyleUnicorn />
            </div>
            <p className="earningsQuizFlow_question">
              What is the probability that crypto will fall this year?
            </p>
            <ul className="earningsQuizFlow_options">
              {Q1_OPTIONS.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={
                      q1Pick === opt.id
                        ? "earningsQuizFlow_option earningsQuizFlow_option--active"
                        : "earningsQuizFlow_option"
                    }
                    onClick={() => setQ1Pick(opt.id)}
                  >
                    <span className="earningsQuizFlow_radio" aria-hidden />
                    <span className="earningsQuizFlow_optionText">{opt.text}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="earningsQuizFlow_footer">
              <ProgressRing current={1} total={totalQuestions} />
              <div className="earningsQuizFlow_actions">
                <button type="button" className="earningsQuizFlow_skip" onClick={onClose}>
                  Skip
                </button>
                <button
                  type="button"
                  className="earningsQuizFlow_next"
                  disabled={!q1Pick}
                  onClick={goNextFromQ1}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {phase === "q2" && (
          <>
            <h2 id={titleId} className="earningsQuizFlow_heading">
              What was he talking about?
            </h2>
            <p className="earningsQuizFlow_subheading">Which cryptocurrency is in priority this year</p>
            <div className="earningsQuizFlow_grid">
              {Q2_TILES.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  className={
                    q2Pick === tile.id
                      ? "earningsQuizFlow_tile earningsQuizFlow_tile--active"
                      : "earningsQuizFlow_tile"
                  }
                  onClick={() => setQ2Pick(tile.id)}
                >
                  <span
                    className="earningsQuizFlow_tileIcon"
                    style={{ "--tile-accent": tile.hue }}
                  />
                  <span className="earningsQuizFlow_tileLabel">{tile.label}</span>
                </button>
              ))}
            </div>
            <div className="earningsQuizFlow_footer">
              <ProgressRing current={2} total={totalQuestions} />
              <div className="earningsQuizFlow_actions">
                <button type="button" className="earningsQuizFlow_skip" onClick={onClose}>
                  Skip
                </button>
                <button
                  type="button"
                  className="earningsQuizFlow_next"
                  disabled={!q2Pick}
                  onClick={finishQuiz}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {phase === "done" && (
          <div className="earningsQuizFlow_done">
            <div className="earningsQuizFlow_doneIcon" aria-hidden>
              ✓
            </div>
            <h2 className="earningsQuizFlow_doneTitle">Quiz complete</h2>
            <p className="earningsQuizFlow_doneSub">
              You got {score} of {totalQuestions} correct and earned{" "}
              <strong>{score * 5}</strong> Blinks tokens.
            </p>
            {score < totalQuestions && (
              <p className="earningsQuizFlow_doneHint">
                Correct answers: &quot;Absolutely not&quot; and <strong>BTC</strong>.
              </p>
            )}
            <button type="button" className="earningsQuizFlow_doneBtn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
