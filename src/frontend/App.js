import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Full from "./components/Full/Full";
import { LoadingPage } from "./commons/Components";
import Services from "./Services";
import { Button } from "reactstrap";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      authenticated: false,
      loading: false,
      isSidebarOpen: true
    };
  }
  componentDidMount() {
    this.checkCookie();
  }

  getUser = (id) => {
    Services.getUser(id).then((res) => {
    this.setState({ user: res[0] });
    })
  };

  getCookie = (name) => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
      if (name === cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }

    // Return null if not found
    return null;
  };

  checkCookie = () => {
    let auth = this.getCookie("auth");
    let token = this.getCookie("token");
    let isAdmin = this.getCookie("isAdmin");
    if (token && token !== "" && auth && auth === "true" && isAdmin) {
      Services.getUser(token).then((res) => {
        this.setState({ user: res[0], authenticated: true, isAdmin: isAdmin });
      });
    } else {
      this.logOut(false, null);
    }
  };

  deleteCookie = () => {
    document.cookie = "auth=;";
    document.cookie = "token=;";
    document.cookie = "isAdmin=;";
  };

  getUsers = () => {
    Services.listUsers().then((res) => {
      console.log(res)
    });
  }

  logOut = () => {
    this.setState({
      authenticated: false,
      user: null,
    });
    this.deleteCookie();
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({ isSidebarOpen: !prevState.isSidebarOpen }));
  }

  createNotification = (type, message) => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success(message, "");
        break;
      case "warning":
        NotificationManager.warning(message, "");
        break;
      case "error":
        NotificationManager.error(message, "");
        break;
      default: {
        return;
      }
    }
  };

  render() {
    return (
      <div id="app">
        <NotificationContainer />
        <Router>
          <React.Fragment>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.loading ? (
                  <LoadingPage />
                ) : (
                  this.state.authenticated ? (
                    <Full
                      isSidebarOpen={this.state.isSidebarOpen}
                      toggleSidebar={this.toggleSidebar}
                      logOut={this.logOut}
                      notification={this.createNotification}
                      data={{ user: this.state.user }}
                  />
                  ) : (
                    <div>
                      <h1>Publikus oldal</h1>
                      <Button onClick={() => this.getUsers()}>Userek</Button>
                    </div>
                  ) 
                );
              }}
            />
            <Route
              exact
              path="/login"
              render={() => {
                return this.state.loading ? (
                  <LoadingPage />
                ) : (
                  <Login
                    notification={this.createNotification}
                  />
                );
              }}
            />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
