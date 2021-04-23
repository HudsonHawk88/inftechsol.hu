import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useWindowSize } from "./commons/Components";

import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Public from "./pages/public/Public";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import PublicRoutes from "./pages/public/PublicRoutes";
import Services from "./Services";

function Main(props) {
  const [datas, setDatas] = useState({
    authenticated: false,
    isAdmin: false,
    user: null,
  });

  const getCookie = (name) => {
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

  const deleteCookie = () => {
    document.cookie = "auth=;path=/;path=/admin;max-age: -1;";
    document.cookie = "token=;path=/;path=/admin;max-age: -1;";
    document.cookie = "isAdmin=;path=/;path=/admin;max-age: -1;";
    document.cookie = "light=;path=/;path=/admin;max-age: -1;";
  };

  const logOut = () => {
    setDatas({
      authenticated: false,
      isAdmin: false,
      token: "",
    });
    deleteCookie();
  };

  const token = getCookie("token");

  useEffect(() => {
    let token = getCookie("token");
    let auth = Boolean(getCookie("auth"));
    let isAdmin = Boolean(getCookie("isAdmin"));

    if (token && token !== "" && auth && isAdmin) {
      Services.getUser(token).then((res) => {
        if (!res.err) {
          setDatas({
            authenticated: auth,
            isAdmin: isAdmin,
            user: res[0],
          });
        }
      });
    }
  }, [token]);

  const setDefaultTheme = () => {
    let light = getCookie("light");
    if (!light || light === "" || light === "true") {
      return true;
    } else {
      return false;
    }
  };

  const [isSidebarOpen, setSidebar] = useState(true);
  const [isLight, setLight] = useState(setDefaultTheme());

  useEffect(() => {
    const toggleTheme = () => {
      let body = document.body;
      if (isLight === true) {
        body.classList.replace("theme-dark", "theme-light");
        setLight(true);
        document.cookie = "light=true;path=/;";
        document.cookie = "light=true;path=/admin;";
      }
      if (isLight === false) {
        body.classList.replace("theme-light", "theme-dark");
        setLight(false);
        document.cookie = "light=false;path=/;";
        document.cookie = "light=false;path=/admin;";
      }
    };
    toggleTheme();
  }, [isLight]);

  const createNotification = (type, message) => {
    switch (type) {
      case "info":
        NotificationManager.info(message, "");
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
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <NotificationContainer />
      <React.Fragment>
        {window.location.pathname.includes("admin") ? (
          <Route
            path={"/admin"}
            children={(props) =>
              datas.authenticated ? (
                <Admin
                  {...props}
                  datas={datas}
                  logOut={logOut}
                  notification={createNotification}
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={setSidebar}
                  toggleCheck={setLight}
                  isLight={isLight}
                />
              ) : (
                <Login notification={createNotification} />
              )
            }
          />
        ) : (
          <Route
            exact
            path="/"
            children={(props) => (
              <Public
                {...props}
                isLight={isLight}
                toggleCheck={setLight}
                notification={createNotification}
              >
                <PublicRoutes />
              </Public>
            )}
          />
        )}
      </React.Fragment>
    </React.Fragment>
  );
}

export default Main;

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root")
);
