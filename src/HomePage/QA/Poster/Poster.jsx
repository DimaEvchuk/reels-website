import React from "react";
import "./Poster.css";
import PosterCountdown from "./PosterCountdown.jsx";
import image1 from "../Poster/HP_1.jpg";
import image2 from "../Poster/HP_2.jpg";

const Poster = () => {
  return (
    <div className="poster">
      <div className="text">
        <div className="text_title">What is the blockchian?</div>
        <div className="text_subtitle">
          Diam posuere sed mauris ultrices aliquam ullamcorper. Eu lectus cursus
          in amet mauris vestibulum aliquam.
        </div>
        <div className="buttons">
          <button type="button" className="suggestions_btn">
            <svg
              className="suggestions_btnIcon"
              width="18"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M6.99994 0.525513C3.40106 0.525513 0.472656 3.45391 0.472656 7.0528C0.472656 9.53268 1.86874 11.7768 4.06236 12.882V14.5368C4.06236 16.1564 5.38037 17.4744 6.99994 17.4744C8.61952 17.4744 9.93752 16.1564 9.93752 14.5368V12.882C12.1311 11.7768 13.5272 9.53114 13.5272 7.0528C13.5257 3.45391 10.5988 0.525513 6.99994 0.525513ZM6.99994 16.2498C6.05544 16.2498 5.28699 15.4813 5.28699 14.5368V14.3868L8.71289 14.3868V14.5368C8.71289 15.4813 7.94444 16.2498 6.99994 16.2498ZM9.08335 11.9284C8.85832 12.0248 8.71136 12.2468 8.71136 12.4917V13.1622L7.61072 13.1622L7.61072 9.04588L9.4492 7.20741C9.68801 6.9686 9.68801 6.58131 9.4492 6.34098C9.2104 6.10218 8.82311 6.10218 8.58278 6.34098L6.99688 7.92688L5.41098 6.34098C5.17218 6.10218 4.78489 6.10218 4.54455 6.34098C4.30575 6.57978 4.30575 6.96707 4.54455 7.20741L6.38303 9.04588L6.38303 13.1606H5.2824V12.4902C5.2824 12.2452 5.13697 12.0233 4.91041 11.9268C2.95559 11.0895 1.6927 9.176 1.6927 7.04974C1.69729 4.12899 4.07613 1.75014 6.99994 1.75014C9.92375 1.75014 12.3026 4.12899 12.3026 7.0528C12.3011 9.17753 11.0382 11.0925 9.08335 11.9284Z"
                fill="white"
              />
            </svg>
            <span className="suggestions_btnLabel">Suggestions</span>
          </button>
          <button type="button" className="answer_btn">
            Answer
          </button>
        </div>
      </div>
      <div className="time_left">
        <PosterCountdown durationSeconds={20 * 60} />
      </div>
      <div className="image_poster">
        <img className="image1" src={image1} alt="image1" />
        <img className="image2" src={image2} alt="image2" />
      </div>
    </div>
  );
};

export default Poster;
