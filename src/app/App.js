import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import UserPage from "./pages/user/UserPage";
import Full from "./components/Full/Full";
import { LoadingPage } from "./commons/Components";
import Services from "./Services";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      obj: {},
      authenticated: false,
      loading: false,
    };
  }
  componentDidMount() {
    this.checkCookie();
  }

  getUser = async (id) => {
    try {
      this.setState({ loading: true });
      const response = await Services.getUser(id);
      this.setState({
        user: response,
        loading: false,
      });
    } catch (error) {}
  };

  getCookie = (name) => {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
      if (name == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }

    // Return null if not found
    return null;
  };

  checkCookie = () => {
    let auth = this.getCookie("auth");
    let userId = this.getCookie("userId");
    if (userId !== "" && auth) {
      this.getUser(userId);
      this.setState({ authenticated: true, loading: false });
    } else {
      this.logOut(false, null);
    }
  };

  deleteCookie = () => {
    document.cookie = "auth=; max-age=0";
    document.cookie = "userId=; max-age=0";
  };

  onChange = (auth, response) => {
    if (response) {
      let currentUser = response.then((user) => {
        if (user) {
          this.setState({ user: user });
          return user;
        }
      });
      currentUser = this.state.user;
      this.setState({
        authenticated: auth,
        user: currentUser,
      });
    } else {
      let newResponse = {};
      if (response === null) {
        newResponse = {};
      }
      this.setState({ authenticated: false, user: newResponse });
    }
  };

  logOut = () => {
    this.setState({
      authenticated: false,
      user: {},
    });
    this.deleteCookie();
  };

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
    console.log(this.state.user);
    return (
      <div>
        <NotificationContainer />
        <Router>
          <React.Fragment>
            <Route
              path="/admin"
              render={() => {
                return this.state.loading ? (
                  <LoadingPage />
                ) : (
                  <Full
                    logOut={this.logOut}
                    data={{ user: this.state.user !== {} && this.state.user }}
                  >
                    <Admin />
                  </Full>
                );
              }}
            />
            {/* <Route
              path="/admin"
              render={() => {
                return this.state.loading ? (
                  <LoadingPage />
                ) : this.state.authenticated ? (
                  <Full
                    logOut={this.logOut}
                    data={{ user: this.state.user !== {} && this.state.user }}
                  >
                    <Admin />
                  </Full>
                ) : (
                  <Login
                    onChange={this.onChange}
                    notification={this.createNotification}
                  />
                );
              }}
            /> */}
            <Route
              path="/user"
              exact
              render={() => {
                return this.state.loading ? (
                  <LoadingPage />
                ) : this.state.authenticated ? (
                  <UserPage
                    logOut={this.logOut}
                    data={{ user: this.state.user !== {} && this.state.user }}
                  />
                ) : (
                  <Login
                    onChange={this.onChange}
                    notification={this.createNotification}
                  />
                );
              }}
            />
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <div>
                    <h1>Publikus oldal</h1>
                  </div>
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
