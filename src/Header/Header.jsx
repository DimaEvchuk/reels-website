import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

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
          <div className="header_smallIcons">
            <span className="header_smallDot" />
            <span className="header_smallDot header_smallDot--active" />
          </div>
          <div className="header_profile">
            <PersonOutlineIcon fontSize="small" />
          </div>
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
            <span className="navBadge" aria-label="notifications">
              2
            </span>
          </NavLink>

          <NavLink
            to="/academy"
            onClick={closeMenu}
            className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}
          >
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

      <main className="appMain">
        <Outlet />
      </main>
    </>
  );
}
export default Header;
