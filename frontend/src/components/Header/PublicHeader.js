/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { ToggleSwitch } from "../../commons/Components";

const PublicHeader = (props) => {
  const [isOpen, toggleNavbar] = useState(false);
  const navList = document.getElementById("nav-list");

  useEffect(() => {
    if (navList) {
      if (isOpen) {
        navList.classList.toggle("_show");
      } else {
        navList.classList.toggle("_show");
      }
    }
  }, [isOpen]);

  return (
    <div className="public-navbar">
      <div className="public-navbar__logo-div">
        <img className="public-navbar__logo" alt="logo" src="images/logo.png" />
      </div>
      <ToggleSwitch
        className="public-navbar__toggleTheme"
        onClick={props.toggleTheme}
        name="toggleTheme"
        id="themeToggle"
        on={"Light"}
        off={"Dark"}
        value={props.isLight}
      />
      <div
        className="public-navbar__span"
        onClick={() => toggleNavbar(!isOpen)}
      >
        <i className="public-navbar__fa-icon fa fa-bars"></i>
      </div>
      <nav className="public-navbar__nav" id="nav-list">
        <ul className="public-navbar__navlist">
          <li className="public-navbar__navitem">
            <NavLink
              exact
              className="public-navbar__navlink"
              activeClassName="public-navbar__navlink--active"
              to="/"
            >
              Főoldal
            </NavLink>
          </li>
          <li className="public-navbar__navitem">
            <NavLink
              className="public-navbar__navlink"
              activeClassName="public-navbar__navlink--active"
              to="/bio"
            >
              Bio
            </NavLink>
          </li>
          <li className="public-navbar__navitem">
            <NavLink
              className="public-navbar__navlink"
              activeClassName="public-navbar__navlink--active"
              to="/szolgaltatasok"
            >
              Szolgáltatások
            </NavLink>
          </li>
          <li className="public-navbar__navitem">
            <NavLink
              className="public-navbar__navlink"
              activeClassName="public-navbar__navlink--active"
              to="/referenciak"
            >
              Referenciák
            </NavLink>
          </li>
          <li className="public-navbar__navitem">
            <NavLink
              className="public-navbar__navlink"
              activeClassName="public-navbar__navlink--active"
              to="/gdpr"
            >
              GDPR
            </NavLink>
          </li>
          <li className="public-navbar__navitem">
            <NavLink
              className="public-navbar__navlink"
              activeClassName="public-navbar__navlink--active"
              to="/elerhetosegek"
            >
              Elérhetőségek
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PublicHeader;
