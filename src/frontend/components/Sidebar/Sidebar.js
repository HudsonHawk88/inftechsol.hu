import React, { Component } from "react";
import { push as Menu } from "react-burger-menu";
import {
  NavItem,
} from "reactstrap";
import {
  NavLink,
} from "react-router-dom";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: true,
    };
  }

  componentDidMount = () => {
  };

  render() {
    return (
      <Menu
        pageWrapId={"content"}
        outerContainerId={"main"}
        customBurgerIcon={false}
        customCrossIcon={false}
        noOverlay width={ '250px' }
        isOpen={this.props && this.props.isSidebarOpen}
      >
        <NavItem>
          <NavLink to="/admin/users">
            <i className="fa fa-users" aria-hidden="true"></i>{" "}
            &nbsp;Felhasználók
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profil">
            <i className="fa fa-user" aria-hidden="true"></i> Profil
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/tartalom">
            <i className="fa fa-list-alt" aria-hidden="true"></i> Tartalom
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/ugyfelszolgalat">
            <i className="fa fa-life-ring" aria-hidden="true"></i>{" "}
            Ügyfélszolgálat
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/hirlevel">
            <i className="fa fa-envelope-o" aria-hidden="true"></i>{" "}
            Hírlevél
          </NavLink>
        </NavItem>
      </Menu>
    );
  }
}

export default Sidebar;
