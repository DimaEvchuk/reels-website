import React from "react";
import { Link } from "react-router-dom";
import "./Blinks.css";
import gradient from "./GradientShape.png";
import BlinksCoinIcon from "./BlinksCoinIcon";

const Blinks = () => {
  return (
    <section className="blinks" aria-labelledby="blinks-heading">
      <img src={gradient} alt="" className="blinks__gradient" />
      <div className="blinks__inner">
        <div className="blinks__content">
          <div className="blinks__eyebrow">
            <BlinksCoinIcon className="blinks__eyebrow-icon" width={23} height={20} />
            <span className="blinks__eyebrow-text">Blinks</span>
          </div>
          <h2 id="blinks-heading" className="blinks__title">
            <span className="blinks__title-line">LEARN & EARN</span>
            <span className="blinks__title-line">BLINKS</span>
          </h2>
          <Link to="/earnings" className="answer_btn">
            See your earnings
          </Link>
        </div>
        <div className="blinks__visual" aria-hidden>
          <div className="blinks__coin blinks__coin--back">
            <BlinksCoinIcon width={155} height={132} />
          </div>
          <div className="blinks__coin blinks__coin--front">
            <BlinksCoinIcon width={155} height={132} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blinks;
