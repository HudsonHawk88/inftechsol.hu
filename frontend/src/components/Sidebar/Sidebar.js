import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useWindowSize } from "../../commons/Components";

const Sidebar = () => {
  const width = useWindowSize().width;

  const collapseSidebar = () => {
    if (width < 992) {
      document.body.classList.remove("sidebar-fixed");
      document.body.classList.add("sidebar-hidden");
    } else {
      document.body.classList.remove("sidebar-hidden");
      document.body.classList.add("sidebar-fixed");
    }
  };

  const toggleSidebar = () => {
    if (document.body.classList.contains("sidebar-fixed")) {
      document.body.classList.remove("sidebar-fixed");
      document.body.classList.add("sidebar-hidden");
    } else {
      document.body.classList.remove("sidebar-hidden");
      document.body.classList.add("sidebar-fixed");
    }
  };

  useEffect(() => {
    collapseSidebar();
  }, [width]);

  return (
    <React.Fragment>
      <div id="sidebar" className="sidebar">
        <ul className="sidebar__navbar-nav">
          <li className="sidebar__navitem">
            <NavLink
              exact
              className="sidebar__nav-link"
              activeClassName="sidebar__nav-link-active"
              to="/admin"
            >
              {" "}
              <span className="sidebar__icon">
                <i className="fa fa-home" aria-hidden="true"></i>
              </span>
              <span className="sidebar__title">Kezdőlap</span>
            </NavLink>
          </li>
          <li className="sidebar__navitem">
            <NavLink
              exact
              className="sidebar__nav-link"
              activeClassName="sidebar__nav-link-active"
              to="/admin/szolgaltatasok"
            >
              {" "}
              <span className="sidebar__icon">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
              </span>
              <span className="sidebar__title">Szolgáltatások</span>
            </NavLink>
          </li>
          <li className="sidebar__navitem">
            <NavLink
              exact
              className="sidebar__nav-link"
              activeClassName="sidebar__nav-link-active"
              to="/admin/referenciak"
            >
              {" "}
              <span className="sidebar__icon">
                <i className="fa fa-external-link" aria-hidden="true"></i>
              </span>
              <span className="sidebar__title">Referenciák</span>
            </NavLink>
          </li>
          <li className="sidebar__navitem">
            <NavLink
              exact
              className="sidebar__nav-link"
              activeClassName="sidebar__nav-link-active"
              to="/admin/users"
            >
              {" "}
              <span className="sidebar__icon">
                <i className="fa fa-users" aria-hidden="true"></i>
              </span>
              <span className="sidebar__title">Felhasználók</span>
            </NavLink>
          </li>
          <li className="sidebar__navitem">
            <NavLink
              exact
              className="sidebar__nav-link"
              activeClassName="sidebar__nav-link-active"
              to="/admin/elerhetosegek"
            >
              {" "}
              <span className="sidebar__icon">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </span>
              <span className="sidebar__title">Elérhetőségek</span>
            </NavLink>
          </li>
          <li className="sidebar__navitem">
            <NavLink
              exact
              className="sidebar__nav-link"
              activeClassName="sidebar__nav-link-active"
              to="/admin/gdpr"
            >
              {" "}
              <span className="sidebar__icon">
                <i className="fa fa-gavel" aria-hidden="true"></i>
              </span>
              <span className="sidebar__title">GDPR</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div onClick={() => toggleSidebar()} className="sidebar__toggler">
        <span className="navbar-toggler-icon">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </span>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
