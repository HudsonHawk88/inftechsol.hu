import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ width }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    let content = document.getElementById("content");
    if (xPosition < 0) {
      setX(0);
      content.classList.remove("sidebar-hidden");
      content.classList.add("sidebar-fixed");
    } else {
      setX(-width);
      content.classList.remove("sidebar-fixed");
      content.classList.add("sidebar-hidden");
    }
  };

  useEffect(() => {
    setX(0);
  }, []);

  return (
    <React.Fragment>
       <button
          onClick={() => toggleMenu()}
          className="sidebar__toggle-menu"
          style={{
            position: "absolute",
            left: width + 10 + "px",
            top: "15px"
          }}
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
        </button>
      <div
        id="sidebar"
        className="sidebar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
        }}
      >
        <div>
          <NavLink
            exact
            className="sidebar__nav-link"
            activeClassName="sidebar__nav-link-active"
            to="/admin"
          >
            Kezdőlap
          </NavLink>
          <NavLink
            exact
            className="sidebar__nav-link"
            activeClassName="sidebar__nav-link-active"
            to="/admin/referenciak"
          >
            Referenciák
          </NavLink>
          <NavLink
            exact
            className="sidebar__nav-link"
            activeClassName="sidebar__nav-link-active"
            to="/admin/users"
          >
            Felhasználók
          </NavLink>
          <NavLink
            exact
            className="sidebar__nav-link"
            activeClassName="sidebar__nav-link-active"
            to="/blog"
          >
            Blog
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;