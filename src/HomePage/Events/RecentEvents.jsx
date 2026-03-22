import React, { useMemo, useState } from "react";
import "./RecentsEvents.css";
import EventsJSON from "./Events.json";
import speaker1 from "./speaker1.png";
import speaker2 from "./speaker2.png";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  notes: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function validateBookingForm(values) {
  const errors = {};

  const name = values.fullName.trim();
  if (!name) {
    errors.fullName = "Enter your full name.";
  } else if (name.length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  } else if (name.length > 120) {
    errors.fullName = "Name is too long (max 120 characters).";
  } else if (!/[a-zа-яё]/i.test(name)) {
    errors.fullName = "Name should include letters.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email is too long.";
  }

  const phoneRaw = values.phone.trim();
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  if (!phoneRaw) {
    errors.phone = "Enter your phone number.";
  } else if (phoneDigits.length < 10) {
    errors.phone = "Phone must contain at least 10 digits.";
  } else if (phoneDigits.length > 15) {
    errors.phone = "Phone number is too long.";
  }

  if (values.notes.length > 500) {
    errors.notes = "Notes must be 500 characters or less.";
  }

  return errors;
}

function RecentEvents({ limit, layout = "scroll" }) {
  const [bookingEvent, setBookingEvent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const getSpeakerImg = (photoSpeaker) => {
    if (typeof photoSpeaker !== "string") return speaker1;
    if (photoSpeaker.toLowerCase().includes("speaker2")) return speaker2;
    return speaker1;
  };

  const events = useMemo(() => {
    const list = [...EventsJSON];
    if (typeof limit === "number" && limit > 0) {
      return list.slice(0, limit);
    }
    return list;
  }, [limit]);

  const openBooking = (event) => {
    setSubmitted(false);
    setForm(emptyForm);
    setErrors({});
    setBookingEvent(event);
  };

  const closeBooking = () => {
    setBookingEvent(null);
    setSubmitted(false);
    setForm(emptyForm);
    setErrors({});
  };

  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateBookingForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const listClassName =
    layout === "grid" ? "allBlockEvent allBlockEvent--grid" : "allBlockEvent";

  return (
    <>
      <div className={listClassName}>
        {events.map((event, index) => (
          <div key={event.id ?? index} className="blockEvent">
            <div className="person">
              <div className="speaker">
                <div className="photo">
                  <img
                    src={getSpeakerImg(event.photoSpeaker)}
                    alt=""
                  />
                </div>
                <div className="name">{event.nameSpeaker}</div>
              </div>
              <div className="price">
                <p>{event.priceSpeaker}</p>
              </div>
            </div>

            <div className="topic">
              <div className="titleEvent">{event.nameEvents}</div>
              <div className="subTitle">
                <div className="particalpants">
                  <p>Participants:</p>
                  {event.participants}
                </div>
                <div className="solidOut">
                  <p>Sold out:</p>
                  {event.ticets
                    ? Math.round((event.participants / event.ticets) * 100) + "%"
                    : "0%"}
                </div>
              </div>
            </div>
            <div className="footerBlock">
              <div className="dateEvent">
                <p>{event.dateEvents.split(",")[0].trim()}:</p>
                {event.dateEvents.split(",")[1]?.trim()}
              </div>
              <button
                type="button"
                className="btnBook"
                onClick={() => openBooking(event)}
              >
                Book Class
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookingEvent ? (
        <div
          className="eventBookOverlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="eventBookTitle"
        >
          <button
            type="button"
            className="eventBookOverlay_backdrop"
            aria-label="Close"
            onClick={closeBooking}
          />
          <div className="eventBookModal">
            <div className="eventBookModal_head">
              <h2 id="eventBookTitle" className="eventBookModal_title">
                Book a class
              </h2>
              <p className="eventBookModal_event">{bookingEvent.nameEvents}</p>
              <p className="eventBookModal_meta">
                {bookingEvent.nameSpeaker} · {bookingEvent.priceSpeaker}
              </p>
            </div>

            {submitted ? (
              <div className="eventBookModal_done">
                <p>Thank you — we&apos;ll contact you shortly.</p>
                <button
                  type="button"
                  className="eventBookModal_btn eventBookModal_btnPrimary"
                  onClick={closeBooking}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="eventBookForm" onSubmit={handleSubmit} noValidate>
                <label className="eventBookForm_label">
                  Full name
                  <input
                    className={`eventBookForm_input${
                      errors.fullName ? " eventBookForm_input--invalid" : ""
                    }`}
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, fullName: e.target.value }));
                      clearFieldError("fullName");
                    }}
                    autoComplete="name"
                    aria-invalid={errors.fullName ? "true" : "false"}
                    aria-describedby={
                      errors.fullName ? "eventBook_err_fullName" : undefined
                    }
                  />
                  {errors.fullName ? (
                    <span
                      id="eventBook_err_fullName"
                      className="eventBookForm_error"
                      role="alert"
                    >
                      {errors.fullName}
                    </span>
                  ) : null}
                </label>
                <label className="eventBookForm_label">
                  Email
                  <input
                    className={`eventBookForm_input${
                      errors.email ? " eventBookForm_input--invalid" : ""
                    }`}
                    type="email"
                    name="email"
                    inputMode="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, email: e.target.value }));
                      clearFieldError("email");
                    }}
                    autoComplete="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={
                      errors.email ? "eventBook_err_email" : undefined
                    }
                  />
                  {errors.email ? (
                    <span
                      id="eventBook_err_email"
                      className="eventBookForm_error"
                      role="alert"
                    >
                      {errors.email}
                    </span>
                  ) : null}
                </label>
                <label className="eventBookForm_label">
                  Phone
                  <input
                    className={`eventBookForm_input${
                      errors.phone ? " eventBookForm_input--invalid" : ""
                    }`}
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, phone: e.target.value }));
                      clearFieldError("phone");
                    }}
                    autoComplete="tel"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={
                      errors.phone ? "eventBook_err_phone" : undefined
                    }
                  />
                  {errors.phone ? (
                    <span
                      id="eventBook_err_phone"
                      className="eventBookForm_error"
                      role="alert"
                    >
                      {errors.phone}
                    </span>
                  ) : null}
                </label>
                <label className="eventBookForm_label">
                  Notes (optional)
                  <textarea
                    className={`eventBookForm_textarea${
                      errors.notes ? " eventBookForm_input--invalid" : ""
                    }`}
                    name="notes"
                    rows={3}
                    maxLength={500}
                    value={form.notes}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, notes: e.target.value }));
                      clearFieldError("notes");
                    }}
                    aria-invalid={errors.notes ? "true" : "false"}
                    aria-describedby={
                      errors.notes ? "eventBook_err_notes" : undefined
                    }
                  />
                  <span className="eventBookForm_hint">
                    {form.notes.length}/500
                  </span>
                  {errors.notes ? (
                    <span
                      id="eventBook_err_notes"
                      className="eventBookForm_error"
                      role="alert"
                    >
                      {errors.notes}
                    </span>
                  ) : null}
                </label>
                <div className="eventBookForm_actions">
                  <button
                    type="button"
                    className="eventBookModal_btn eventBookModal_btnGhost"
                    onClick={closeBooking}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="eventBookModal_btn eventBookModal_btnPrimary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RecentEvents;
