/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToggleSwitch } from "../../commons/Components";

function Header(props) {
  const [isDropped, setDrop] = useState(false);
  const profileDrop = document.getElementById("profile-dropdown");
  
  const user = props.data && props.data.user && props.data.user;
  // const user = {
  //   vezeteknev: "Tóth",
  //   keresztnev: "Gergő"
  // }

  console.log(props);
  useEffect(() => {
    if (profileDrop) {
      if (isDropped) {
        profileDrop.classList.toggle("_show");
      } else {
        profileDrop.classList.toggle("_show");
      }
    }
  }, [isDropped]);

  console.log("isLight: ", props.isLight);

  return (
    <div className="admin-navbar">
      <div className="admin-navbar__logo-div">
        <img className="admin-navbar__logo" alt="logo" src={window.location.origin + "/images/logo.png"} />
      </div>
      <ToggleSwitch
        className="admin-navbar__toggleTheme"
        onClick={props.toggleCheck}
        name="admin_toggleTheme"
        id="admin_themeToggle"
        on={"Light"}
        off={"Dark"}
        value={props.isLight}
      />
      {/* <div
        className="admin-navbar__span"
        onClick={() => props.toggleSidebar(!props.isSidebarOpen)}
      >
        <i className="admin-navbar__fa-icon fa fa-bars"></i>
        <input id="sidebar-toggle" type="checkbox" checked={props.isSidebarOpen} />
      </div> */}
      <nav className="admin-navbar__nav" id="nav-list">
        <ul className="admin-navbar__navlist">
            <li className="admin-navbar__navitem">
                <div
                    className="admin-navbar__profile"
                    onClick={() => setDrop(!isDropped)}
                >
                    <img className="admin-navbar__profile-image" src={"https://cicunevelde.eoldal.hu/img/mid/5/cica.jpg"} alt="profilepicture" />
                    {user && user.vezeteknev + " " + user.keresztnev}&nbsp;&nbsp;
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                    <ul className="admin-navbar__profile-list" id="profile-dropdown">
                        <li className="admin-navbar__navitem">
                            <NavLink
                                to="/"
                                className="admin-navbar__nav-link"
                                activeClassName="admin-navbar__nav-link--active"
                                onClick={() => props.logOut()}
                            >
                                <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
                                Kijelentkezés
                            </NavLink>
                        </li>
                    </ul>         
                </div>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
