import React from "react";
import "./Community.css";

import CommunityHub from "./CommunityHub/CommunityHub.jsx";

const Community = () => {
  return (
    <div className="communityPage">
      <div className="communityPage__inner">
        <CommunityHub />
      </div>
    </div>
  );
};

export default Community;
