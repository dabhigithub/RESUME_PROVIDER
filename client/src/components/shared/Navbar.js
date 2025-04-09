import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import FaTimes for close icon
import { GiCrossedBones } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobile(!mobile);
  };

  const closeUserMenu = () => {
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <img src={Logo} className="nav-logo" alt="Logo" />
        </Link>
        <ul
          className={mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/template">Template</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <div className="user-menu">
              <FaUserAlt onClick={toggleUserMenu} />
              {showUserMenu && (
                <>
                  <div className="overlay" onClick={closeUserMenu}></div> {/* Close popup on overlay click */}
                  <div className="user-menu-popup">
                    <div className="close-icon" onClick={toggleUserMenu}>
                      <FaTimes />
                    </div>
                    <ul>
                      <li>
                        <Link to="/login" onClick={closeUserMenu}>Login</Link> {/* Close popup on login link click */}
                      </li>
                      <li>
                        <Link to="/register" onClick={closeUserMenu}>Register</Link> {/* Close popup on register link click */}
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </li>
        </ul>
        <button
          className="mobile-menu-icon mobile-btn"
          onClick={toggleMobileMenu}
        >
          {mobile ? <GiCrossedBones /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
