import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom"

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isOpen: false
    };
  }

  componentDidMount = () => {
    console.log("DATA: ", this.props.data)
  }

  toggleHeader = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    return (
      <Navbar className="sticky-top" id="header-navbar" color="dark" light expand="lg">
        <NavbarToggler onClick={this.props && this.props.toggleSidebar} className="sidebar" />
        <NavbarBrand href="/">Inftechsol</NavbarBrand>
        <NavbarToggler onClick={this.toggleHeader} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav pills navbar className="mx-auto">
              <NavItem>
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName="nav-link--active"
                >
                  <i className="fa fa-home" aria-hidden="true"></i> Főoldal
                </NavLink>
              </NavItem>
              <NavItem>
              <NavLink
                to="/admin/users"
                className="nav-link"
                activeClassName="nav-link--active"
              >
                <i className="fa fa-users" aria-hidden="true"></i>{" "}
                &nbsp;Felhasználók
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/tartalom"
                className="nav-link"
                activeClassName="nav-link--active"
              >
                <i className="fa fa-list-alt" aria-hidden="true"></i> Tartalom
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/ugyfelszolgalat"
                className="nav-link"
                activeClassName="nav-link--active"
              >
                <i className="fa fa-life-ring" aria-hidden="true"></i>{" "}
                Ügyfélszolgálat
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/hirlevel"
                className="nav-link"
                activeClassName="nav-link--active"
              >
                <i className="fa fa-envelope-o" aria-hidden="true"></i>{" "}
                Hírlevél
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
