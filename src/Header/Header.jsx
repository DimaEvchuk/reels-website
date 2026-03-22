import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import "./Header.css";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

function Header() {
  // By default keep the sidebar visible to match the "Discover" layout.
  const [isClosed, setIsClosed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsClosed(!isClosed);
  };

  const closeMenu = () => {
    setIsClosed(true);
  };

  useEffect(() => {
    const handleResize = () => {
      // On small screens we want the sidebar to behave like an overlay.
      if (window.innerWidth <= 900) {
        setIsMobile(true);
        setIsClosed(true);
      } else {
        setIsMobile(false);
        setIsClosed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event) => {
      if (!isMobile) return;
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsClosed(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <>
      <header ref={headerRef} className={`header ${isClosed ? " close" : ""}`}>
        <div className="header_mobileToggle">
          <button
            type="button"
            className="header_mobileToggleBtn"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <MenuIcon className={`menu_icon ${isClosed ? "menu_show" : ""}`} />
            <CloseIcon className={`close_icon ${isClosed ? "" : "close_show"}`} />
          </button>
        </div>

        <div className="header_topRow">
          <button
            type="button"
            className="header_profile"
            onClick={() => {
              navigate("/admin");
              closeMenu();
            }}
            aria-label="Open profile and settings"
          >
            <PersonOutlineIcon fontSize="small" />
          </button>
        </div>

        <div className="header_search">
          <SearchIcon className="header_searchIcon" />
          <input className="header_searchInput" placeholder="Search" />
        </div>

        <div className="header_sectionTitle">MAIN</div>
        <nav className="header_routing">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            <HomeOutlinedIcon />
            <span className="navItem_label">Home</span>
          </NavLink>

          <NavLink
            to="/watch"
            onClick={closeMenu}
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            <PlayCircleOutlineIcon />
            <span className="navItem_label">Watch</span>
          </NavLink>

          <NavLink
            to="/community"
            onClick={closeMenu}
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            <GroupsOutlinedIcon />
            <span className="navItem_label">Community</span>

          </NavLink>

          <NavLink
            to="/academy"
            onClick={closeMenu}
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
            <svg
              className="navItem_academyIcon"
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M19.8461 11.376L19.1486 10.2977C19.1182 10.2494 19.0825 10.2065 19.0449 10.1671V5.80021V5.79842C19.0449 4.65394 18.4083 3.6239 17.3836 3.11067L12.6179 0.726926C10.6794 -0.242309 8.36545 -0.242309 6.42698 0.726926L1.6613 3.11067C0.636626 3.62211 0 4.65215 0 5.79842C0 6.94469 0.636626 7.97294 1.6613 8.48617L2.70919 9.01013V12.6939C2.70919 14.3856 3.91807 15.8234 5.58472 16.1131L6.94735 16.3491C7.74491 16.4886 8.54962 16.5566 9.35254 16.5566C10.1555 16.5566 10.9602 16.4868 11.7578 16.3491L13.1204 16.1131C14.7871 15.8234 15.9959 14.3856 15.9959 12.6939V9.17644L17.3801 8.48438C17.4587 8.44504 17.5356 8.40033 17.6107 8.35563V10.1689C17.5732 10.21 17.5374 10.253 17.507 10.2995L16.8096 11.3778C16.6129 11.6818 16.5986 12.0555 16.7721 12.3738C16.9455 12.6921 17.2656 12.8835 17.6286 12.8835H19.0217C19.3847 12.8835 19.7048 12.6939 19.8782 12.3738C19.9587 12.2254 19.9998 12.0663 19.9998 11.9071C20.0034 11.7211 19.9516 11.5405 19.8461 11.376ZM14.5689 12.6921C14.5689 13.6864 13.8572 14.5323 12.879 14.7021L11.5164 14.9382C10.0822 15.1868 8.62833 15.1868 7.19415 14.9382L5.83148 14.7021C4.85151 14.5323 4.14159 13.6864 4.14159 12.6921V9.72364L6.42877 10.8663C7.39801 11.351 8.46024 11.5924 9.52425 11.5924C10.5883 11.5924 11.6505 11.351 12.6197 10.8663L14.5707 9.89174V12.6921H14.5689ZM16.7434 7.20578L11.9777 9.58952C10.4398 10.3585 8.60509 10.3585 7.06719 9.58952L2.30146 7.20578C1.75604 6.93396 1.43239 6.40643 1.43239 5.79842C1.43239 5.19041 1.75783 4.66288 2.30146 4.39106L7.06719 2.00911C8.60509 1.24016 10.4398 1.24016 11.9777 2.00911L16.7434 4.39106C17.2871 4.66288 17.6125 5.18862 17.6125 5.79842V5.80021C17.6143 6.40643 17.2888 6.93217 16.7434 7.20578Z"
                fill="white"
                fillOpacity="0.5"
              />
            </svg>
            <span className="navItem_label">Academy</span>
          </NavLink>
        </nav>

        <div className="header_footer">
          <button
            type="button"
            className="header_footerHelp"
            onClick={() => navigate("/")}
          >
            <HelpOutlineIcon fontSize="small" />
            Help
          </button>
          <div className="header_footerLegal">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Privacy & Policy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Terms & Conditions
            </a>
          </div>
        </div>
      </header>

      <main key={location.pathname} className="appMain appMain--routeIn">
        <Outlet />
      </main>
    </>
  );
}
export default Header;
