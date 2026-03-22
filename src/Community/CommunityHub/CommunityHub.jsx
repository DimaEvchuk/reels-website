import React from "react";
import "./CommunityHub.css";
import ScrollReveal from "../../components/ScrollReveal/ScrollReveal.jsx";

const STATS = [
  { label: "Members", value: "52K+" },
  { label: "Activity", value: "24/7" },
  { label: "Languages", value: "14" },
  { label: "AMA sessions", value: "210+" },
];

const CHANNELS = [
  {
    id: "discord",
    name: "Discord",
    hint: "Voice, chats & announcements",
    accent: "#5865F2",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="communityHubCard__svg">
        <path
          fill="currentColor"
          d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
        />
      </svg>
    ),
  },
  {
    id: "telegram",
    name: "Telegram",
    hint: "News & support",
    accent: "#2AABEE",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="communityHubCard__svg">
        <path
          fill="currentColor"
          d="M21.946 2.318a1.077 1.077 0 0 0-1.13-.095l-19.05 7.35a1.078 1.078 0 0 0 .095 2.01l5.37 1.68 2.1 6.75a1.078 1.078 0 0 0 1.98.15l2.85-4.35 6.15 4.5c.33.24.78.18 1.02-.15a1.08 1.08 0 0 0 .12-.99l-7.35-19.05a1.08 1.08 0 0 0-1.155-.615zM17.1 6.45 8.85 14.1l-.45 3.6 1.05-3.15 7.65-8.1z"
        />
      </svg>
    ),
  },
  {
    id: "twitter",
    name: "Twitter / X",
    hint: "Feed & updates",
    accent: "#E7E9EA",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="communityHubCard__svg">
        <path
          fill="currentColor"
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    hint: "Code & docs",
    accent: "#F0F6FC",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="communityHubCard__svg">
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    ),
  },
  {
    id: "medium",
    name: "Medium",
    hint: "Articles & deep dives",
    accent: "#00AB6C",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="communityHubCard__svg">
        <path
          fill="currentColor"
          d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
        />
      </svg>
    ),
  },
  {
    id: "education",
    name: "Education",
    hint: "Courses & Academy",
    accent: "#8B5CF6",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="communityHubCard__svg">
        <path
          fill="currentColor"
          d="M12 3 1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm5.13 8.54L12 15.08 6.87 11.54 12 8l5.13 3.54zM8 13.09l4 2.19 4-2.19V16l-4 2.19L8 16v-2.91z"
        />
      </svg>
    ),
  },
];

const CommunityHub = () => {
  return (
    <section
      className="communityHub"
      aria-labelledby="community-hub-heading"
      lang="en"
    >
      <div className="communityHub__ambient" aria-hidden>
        <span className="communityHub__orb communityHub__orb--1" />
        <span className="communityHub__orb communityHub__orb--2" />
      </div>

      <div className="communityHub__shell">
        <ScrollReveal variant="fade-up" delayMs={0}>
        <div className="communityHub__stats" role="list">
          {STATS.map((s) => (
            <div key={s.label} className="communityHubStat" role="listitem">
              <span className="communityHubStat__value">{s.value}</span>
              <span className="communityHubStat__label">{s.label}</span>
            </div>
          ))}
        </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" delayMs={80}>
        <h1 id="community-hub-heading" className="communityHub__title">
          Community
        </h1>
        <p className="communityHub__lead">
          Blockchain, DeFi &amp; crypto — learn, discuss and build together. Join
          the ecosystem channels.
        </p>
        </ScrollReveal>

        <ul className="communityHub__cards">
          {CHANNELS.map((ch, i) => (
            <li key={ch.id} className="communityHub__cardItem">
              <ScrollReveal variant="fade-up" delayMs={i * 45}>
              <article
                className="communityHubCard"
                style={{ "--hub-accent": ch.accent }}
              >
                <div
                  className="communityHubCard__icon"
                  aria-hidden
                  style={{ color: ch.accent }}
                >
                  {ch.icon}
                </div>
                <div className="communityHubCard__body">
                  <h2 className="communityHubCard__name">{ch.name}</h2>
                  <p className="communityHubCard__hint">{ch.hint}</p>
                </div>
                <a href={ch.href} className="communityHubCard__join">
                  Join
                </a>
              </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal variant="scale" delayMs={60}>
        <div className="communityHub__ctaBlock">
          <a href="#" className="communityHub__cta">
            <span className="communityHub__ctaGlow" aria-hidden />
            <span className="communityHub__ctaLabel">Join the ecosystem</span>
            <span className="communityHub__ctaArrow" aria-hidden>
              →
            </span>
          </a>
          <p className="communityHub__ctaNote">
            Free · no KYC for chats · moderation 24/7
          </p>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CommunityHub;
