import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal.jsx";

const STORAGE_KEY = "reels_admin_profile";

const DEFAULT_PROFILE = {
  displayName: "Alex Creator",
  email: "creator@example.com",
  bio: "Short bio: what you create on Reels and what the audience can expect.",
  role: "Content creator",
  language: "English",
  emailNotifications: true,
  publicProfile: true,
  joinedAt: "",
};

function readStoredProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getInitialProfile() {
  const stored = readStoredProfile();
  if (stored) {
    return { ...DEFAULT_PROFILE, ...stored };
  }
  return {
    ...DEFAULT_PROFILE,
    joinedAt: new Date().toISOString().slice(0, 10),
  };
}

function Admin() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(() => getInitialProfile());
  const [draft, setDraft] = useState(saved);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (readStoredProfile() !== null) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    // Seed once; initial `saved` already matches getInitialProfile().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(next);
    setDraft(next);
  }, []);

  const startEdit = useCallback(() => {
    setDraft(saved);
    setEditing(true);
  }, [saved]);

  const cancelEdit = useCallback(() => {
    setDraft(saved);
    setEditing(false);
  }, [saved]);

  const saveEdit = useCallback(() => {
    const next = {
      ...draft,
      joinedAt: draft.joinedAt || saved.joinedAt || new Date().toISOString().slice(0, 10),
    };
    persist(next);
    setEditing(false);
  }, [draft, persist, saved.joinedAt]);

  const updateField = useCallback((key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  const initials = useMemo(() => {
    const name = (editing ? draft.displayName : saved.displayName) || "?";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }, [draft.displayName, editing, saved.displayName]);

  const display = editing ? draft : saved;

  return (
    <div className="admin">
      <div className="admin_inner">
        <ScrollReveal variant="fade-up">
        <div className="admin_top">
          <button type="button" className="admin_back" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delayMs={60}>
        <header className="admin_header">
          <h1 className="admin_title">Profile</h1>
          <p className="admin_subtitle">
            Account overview and preferences. Data is stored locally in your browser.
          </p>
        </header>
        </ScrollReveal>

        <ScrollReveal variant="scale" delayMs={100}>
        <div className="admin_card">
          <div className="admin_cardTop">
            <div className="admin_avatar" aria-hidden>
              {initials}
            </div>
            <div className="admin_cardHeadings">
              <h2 className="admin_name">{display.displayName}</h2>
              <p className="admin_role">{display.role}</p>
            </div>
            {!editing ? (
              <button type="button" className="admin_btn admin_btnPrimary" onClick={startEdit}>
                Edit
              </button>
            ) : (
              <div className="admin_actions">
                <button type="button" className="admin_btn admin_btnGhost" onClick={cancelEdit}>
                  Cancel
                </button>
                <button type="button" className="admin_btn admin_btnPrimary" onClick={saveEdit}>
                  Save
                </button>
              </div>
            )}
          </div>

          <dl className="admin_meta">
            <div className="admin_metaRow">
              <dt>Member since</dt>
              <dd>{saved.joinedAt || "—"}</dd>
            </div>
            <div className="admin_metaRow">
              <dt>Email</dt>
              <dd>
                {editing ? (
                  <input
                    className="admin_input"
                    type="email"
                    value={draft.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    autoComplete="email"
                  />
                ) : (
                  display.email
                )}
              </dd>
            </div>
            <div className="admin_metaRow admin_metaRow--full">
              <dt>Bio</dt>
              <dd>
                {editing ? (
                  <textarea
                    className="admin_textarea"
                    rows={4}
                    value={draft.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                  />
                ) : (
                  display.bio || "—"
                )}
              </dd>
            </div>
            <div className="admin_metaRow">
              <dt>Display name</dt>
              <dd>
                {editing ? (
                  <input
                    className="admin_input"
                    type="text"
                    value={draft.displayName}
                    onChange={(e) => updateField("displayName", e.target.value)}
                    autoComplete="name"
                  />
                ) : (
                  display.displayName
                )}
              </dd>
            </div>
            <div className="admin_metaRow">
              <dt>Role / title</dt>
              <dd>
                {editing ? (
                  <input
                    className="admin_input"
                    type="text"
                    value={draft.role}
                    onChange={(e) => updateField("role", e.target.value)}
                  />
                ) : (
                  display.role
                )}
              </dd>
            </div>
            <div className="admin_metaRow">
              <dt>Interface language</dt>
              <dd>
                {editing ? (
                  <select
                    className="admin_select"
                    value={draft.language}
                    onChange={(e) => updateField("language", e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Русский">Русский</option>
                    <option value="Español">Español</option>
                  </select>
                ) : (
                  display.language
                )}
              </dd>
            </div>
            <div className="admin_metaRow admin_metaRow--toggle">
              <dt>Email notifications</dt>
              <dd>
                {editing ? (
                  <label className="admin_toggle">
                    <input
                      type="checkbox"
                      checked={draft.emailNotifications}
                      onChange={(e) => updateField("emailNotifications", e.target.checked)}
                    />
                    <span>Product updates and tips</span>
                  </label>
                ) : (
                  <span>{display.emailNotifications ? "On" : "Off"}</span>
                )}
              </dd>
            </div>
            <div className="admin_metaRow admin_metaRow--toggle">
              <dt>Public profile</dt>
              <dd>
                {editing ? (
                  <label className="admin_toggle">
                    <input
                      type="checkbox"
                      checked={draft.publicProfile}
                      onChange={(e) => updateField("publicProfile", e.target.checked)}
                    />
                    <span>Show in community directory</span>
                  </label>
                ) : (
                  <span>{display.publicProfile ? "Visible" : "Hidden"}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default Admin;
