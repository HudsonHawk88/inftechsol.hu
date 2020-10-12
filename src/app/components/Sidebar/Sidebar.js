import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  NavItem,
  Navbar,
  NavbarToggler,
  Nav,
  Collapse,
  NavbarBrand,
  Button,
  ButtonToggle,
} from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount = () => {
    this.toggleNavbar();
  };

  toggleNavbar = () => {
    let nav = document.getElementById("navbar");
    let main = document.getElementById("main");
    this.setState(() => ({ collapsed: !this.state.collapsed }));
    if (this.state.collapsed === true) {
      nav.style.width = "58px";
      nav.style.opacity = 1;
      main.style.marginLeft = "70px";
    } else {
      nav.style.width = "200px";
      nav.style.opacity = 1;
      main.style.marginLeft = "212px";
    }
  };

  render() {
    console.log(this.state.collapsed);
    return (
      <div className="px-1 bg-dark fixed" id="sticky-sidebar">
        <div className="nav flex-column flex-nowrap vh-100 overflow-x-hidden text-white">
          <Button
            outline
            color="secondary"
            data-toggle="navbar"
            onClick={this.toggleNavbar}
          >
            <i class="fa fa-bars" aria-hidden="true"></i>
          </Button>
          <Navbar id="navbar" color="dark" expand="lg">
            <Nav vertical pills navbar>
              {this.state.collapsed ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink to="/admin/users">
                      <i class="fa fa-users" aria-hidden="true"></i>{" "}
                      &nbsp;Felhasználók
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/profil">
                      <i class="fa fa-user" aria-hidden="true"></i> Profil
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/tartalom">
                      <i class="fa fa-list-alt" aria-hidden="true"></i> Tartalom
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/ugyfelszolgalat">
                      <i class="fa fa-life-ring" aria-hidden="true"></i>{" "}
                      Ügyfélszolgálat
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/hirlevel">
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>{" "}
                      Hírlevél
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem className="col-md-1 col-sm-1">
                    <NavLink to="/admin/users">
                      <i class="fa fa-users" aria-hidden="true"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem className="col-md-1 col-sm-1">
                    <NavLink to="/profil">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem className="col-md-1 col-sm-1">
                    <NavLink to="/tartalom">
                      <i class="fa fa-list-alt" aria-hidden="true"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem className="col-md-1 col-sm-1">
                    <NavLink to="/ugyfelszolgalat">
                      <i class="fa fa-life-ring" aria-hidden="true"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem className="col-md-1 col-sm-1">
                    <NavLink to="/hirlevel">
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default Sidebar;
