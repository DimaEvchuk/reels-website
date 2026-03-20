import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./Header.css";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const [isClosed, setIsClosed] = useState(true);
  const headerRef = useRef(null);

  const toggleMenu = () => {
    setIsClosed(!isClosed);
  };

  const closeMenu = () => {
    setIsClosed(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsClosed(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className={`header ${isClosed ? " close" : ""}`}>
        <div className="header_icon">
          <MenuIcon
            className={`menu_icon ${isClosed ? "" : "menu_close"}`}
            onClick={toggleMenu}
          />
          <CloseIcon
            className={`close_icon ${isClosed ? "close_close" : ""}`}
            onClick={toggleMenu}
          />
        </div>
        <div className="header_info">
          <div className="notification">n</div>
          <div className="profile_icon">P_I</div>
        </div>
        <div className="header_search">Search</div>
        <nav className="header_routing">
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/watch" onClick={closeMenu}>
            Watch
          </NavLink>
          <NavLink to="/community" onClick={closeMenu}>
            Community
          </NavLink>
          <NavLink to="/academy" onClick={closeMenu}>
          Academy
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </>
  );
}
export default Header;
