import React, { useId, useMemo } from "react";
import "./ConfettiAnimation.css";

const COLORS = [
  "#fbbf24",
  "#f472b6",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#fb7185",
  "#f97316",
  "#22d3ee",
  "#c084fc",
  "#fde047",
  "#4ade80",
  "#818cf8",
];

function hashSeed(i) {
  let x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function makePieces(count) {
  return Array.from({ length: count }, (_, i) => {
    const r1 = hashSeed(i);
    const r2 = hashSeed(i + 17);
    const r3 = hashSeed(i + 31);
    return {
      id: i,
      left: r1 * 100,
      w: 5 + r2 * 9,
      h: 6 + r3 * 12,
      delay: r2 * 1.4,
      duration: 2.4 + r3 * 2.2,
      drift: (r1 - 0.5) * 100,
      spin: 360 + Math.floor(r2 * 1080),
      color: COLORS[i % COLORS.length],
    };
  });
}

/** Full-screen confetti behind quiz panel; show only when quiz finished with perfect score. */
export function QuizConfetti({ active }) {
  const pieces = useMemo(() => makePieces(52), []);
  const gradId = useId().replace(/:/g, "");

  if (!active) return null;

  return (
    <div className="quizConfetti_layer" aria-hidden>
      <svg
        className="quizConfetti_svgBurst"
        viewBox="0 0 1086 661"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <g transform="translate(0 133.614)">
          <rect
            width="520"
            height="560"
            fill={`url(#${gradId})`}
            opacity="0.35"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 -120 200)"
            className="quizConfetti_burstRect"
          />
        </g>
        {Array.from({ length: 42 }, (_, i) => {
          const x = hashSeed(i * 3) * 1086;
          const y = hashSeed(i * 5 + 1) * 661;
          const rw = 8 + hashSeed(i * 7) * 14;
          const rh = 10 + hashSeed(i * 11) * 16;
          const rot = hashSeed(i * 13) * 360;
          const fill = COLORS[(i + 3) % COLORS.length];
          return (
            <rect
              key={`s-${i}`}
              x={x}
              y={y}
              width={rw}
              height={rh}
              rx={2}
              fill={fill}
              opacity={0.55 + hashSeed(i * 19) * 0.4}
              transform={`rotate(${rot} ${x + rw / 2} ${y + rh / 2})`}
              className="quizConfetti_svgBit"
              style={{ animationDelay: `${hashSeed(i * 23) * 0.8}s` }}
            />
          );
        })}
      </svg>
      <div className="quizConfetti_particles">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="quizConfetti_piece"
            style={{
              left: `${p.left}%`,
              width: p.w,
              height: p.h,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ["--quiz-drift"]: `${p.drift}px`,
              ["--quiz-spin-end"]: `${p.spin}deg`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
