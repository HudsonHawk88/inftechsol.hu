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

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersJson: [],
      modositObj: {},
      formType: "FEL",
      isModalOpen: false,
      isDeleteModalOpen: false,
      modalCim: "",
      currentId: null,
      loading: true,
      user: {},
    };
  }

  setCookie = (name, value, daysToLive) => {
    // Encode value in order to escape semicolons, commas, and whitespace
    let cookie = name + "=" + decodeURIComponent(value);

    if (typeof daysToLive === "number") {
      /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
      cookie += "; max-age=" + daysToLive * 24 * 60 * 60;

      document.cookie = cookie;
    }
  };

  componentWillReceiveProps = (props) => {
    console.log(props);
    if (props !== {}) {
      this.setState({ user: props.data.user, loading: false }, () => {
        this.setCookie("auth", true, 1);
        this.setCookie("userId", this.state.user.id, 1);
      });
    }
  };

  render() {
    return (
      <div className="header">
        BLABLABLA
        <Button
          className="user-action"
          onClick={() => this.props.logOut && this.props.logOut(false, null)}
        >
          Kijelentkezés
        </Button>
      </div>
    );
  }
}

export default Header;
