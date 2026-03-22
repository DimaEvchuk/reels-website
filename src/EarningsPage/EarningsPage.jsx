import React, { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "./EarningsPage.css";
import { EarningsQuizFlow } from "./EarningsQuizFlow.jsx";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal.jsx";

function QuizCelebrationModal({ open, onClose, onContinue }) {
  const titleId = useId();

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

  if (!open) return null;

  return createPortal(
    <div
      className="earningsQuizModal_overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="earningsQuizModal_dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="earningsQuizModal_icon" aria-hidden>
          <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="24" cy="26" r="3" fill="currentColor" />
            <circle cx="40" cy="26" r="3" fill="currentColor" />
            <path
              d="M22 38c4 8 16 8 20 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 id={titleId} className="earningsQuizModal_title">
          You&apos;ve learned —<br />
          it&apos;s time to earn
        </h2>
        <p className="earningsQuizModal_subtitle">
          Answer quiz questions and receive
          <br />
          your tokens
        </p>
        <button type="button" className="earningsQuizModal_primary" onClick={onContinue}>
          Continue
        </button>
        <button type="button" className="earningsQuizModal_skip" onClick={onClose}>
          Skip
        </button>
      </div>
    </div>,
    document.body
  );
}

const MOCK_SUMMARY = {
  total: "1 284.50",
  currency: "USDC",
  monthDelta: "+128.40",
  pending: "42.00",
};

const MOCK_HISTORY = [
  { id: "1", title: "Academy lesson completed", amount: "+12.50", date: "22 Mar 2025", type: "credit" },
  { id: "2", title: "Community challenge reward", amount: "+35.00", date: "20 Mar 2025", type: "credit" },
  { id: "3", title: "Blink viewed — sponsor", amount: "+4.20", date: "18 Mar 2025", type: "credit" },
  { id: "4", title: "Withdrawal to wallet", amount: "−200.00", date: "15 Mar 2025", type: "debit" },
  { id: "5", title: "Daily streak bonus", amount: "+8.00", date: "14 Mar 2025", type: "credit" },
];

function EarningsPage() {
  const navigate = useNavigate();
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizFlowOpen, setQuizFlowOpen] = useState(false);

  const closeQuiz = useCallback(() => setQuizOpen(false), []);
  const continueQuiz = useCallback(() => {
    setQuizOpen(false);
    setQuizFlowOpen(true);
  }, []);
  const closeQuizFlow = useCallback(() => setQuizFlowOpen(false), []);

  return (
    <div className="earningsPage">
      <QuizCelebrationModal open={quizOpen} onClose={closeQuiz} onContinue={continueQuiz} />
      <EarningsQuizFlow open={quizFlowOpen} onClose={closeQuizFlow} />

      <ScrollReveal variant="fade-up">
      <div className="earningsPage_top">
        <button type="button" className="earningsPage_back" onClick={() => navigate("/")}>
          ← Back
        </button>
        <button
          type="button"
          className="earningsPage_quizBtn"
          onClick={() => setQuizOpen(true)}
        >
          Quiz
        </button>
      </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delayMs={50}>
      <header className="earningsPage_header">
        <p className="earningsPage_eyebrow">Blinks</p>
        <h1 className="earningsPage_title">Your earnings</h1>
        <p className="earningsPage_subtitle">
          Balance from lessons, challenges and sponsored Blinks. Pending rewards clear within 24–48 hours.
        </p>
      </header>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delayMs={90}>
      <section className="earningsPage_summary" aria-label="Balance overview">
        <div className="earningsPage_balanceCard">
          <span className="earningsPage_balanceLabel">Total balance</span>
          <p className="earningsPage_balanceValue">
            {MOCK_SUMMARY.total}
            <span className="earningsPage_balanceCurrency">{MOCK_SUMMARY.currency}</span>
          </p>
          <p className="earningsPage_balanceHint">This month {MOCK_SUMMARY.monthDelta}</p>
        </div>
        <div className="earningsPage_statCards">
          <div className="earningsPage_stat">
            <span className="earningsPage_statLabel">Pending</span>
            <span className="earningsPage_statValue">{MOCK_SUMMARY.pending} USDC</span>
          </div>
          <div className="earningsPage_stat">
            <span className="earningsPage_statLabel">Lifetime earned</span>
            <span className="earningsPage_statValue">4 902.10 USDC</span>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delayMs={40}>
      <section className="earningsPage_history" aria-labelledby="earnings-history-heading">
        <h2 id="earnings-history-heading" className="earningsPage_sectionTitle">
          Recent activity
        </h2>
        <ul className="earningsPage_list">
          {MOCK_HISTORY.map((row, i) => (
            <ScrollReveal
              key={row.id}
              as="li"
              className="earningsPage_row"
              variant="slide-left"
              delayMs={i * 40}
            >
              <div className="earningsPage_rowMain">
                <span className="earningsPage_rowTitle">{row.title}</span>
                <span className="earningsPage_rowDate">{row.date}</span>
              </div>
              <span
                className={
                  row.type === "credit"
                    ? "earningsPage_rowAmount earningsPage_rowAmount--credit"
                    : "earningsPage_rowAmount earningsPage_rowAmount--debit"
                }
              >
                {row.amount}
              </span>
            </ScrollReveal>
          ))}
        </ul>
      </section>
      </ScrollReveal>
    </div>
  );
}

export default EarningsPage;
