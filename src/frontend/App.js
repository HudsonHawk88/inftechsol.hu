/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoadingPage } from "./commons/Components";

import Services from "./Services";
import Public from "./pages/public/Public";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import AdminRoutes from "./pages/admin/AdminRoutes";
import PublicRoutes from "./pages/public/PublicRoutes";

function App() {
  const [datas, setDatas] = useState({
    user: null,
    authenticated: false,
    loading: false,
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

  const setDefaultTheme = () => {
    let light = getCookie("light");
    if (!light || light === "" || light === "true") {
      return true
    } else {
      return false
    }
  }

  const [isSidebarOpen, setSidebar] = useState(true);
  const [isLight, setLight] = useState(setDefaultTheme());

  const checkCookie = () => {
    let auth = getCookie("auth");
    let token = getCookie("token");
    let isAdmin = getCookie("isAdmin");
   
    if (token && token !== "" && auth && auth === "true" && isAdmin) {
      Services.getUser(token).then((res) => {
        setDatas({ user: res[0], authenticated: true, isAdmin: isAdmin });
      });
    } else {
      logOut(false, null);
    }
   
  };

  const toggleTheme = () => {
    let body = document.body;
    if (isLight === true) {
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
      setLight(true)
      document.cookie = "light=true";
    }
    if (isLight === false) {
      body.classList.remove("theme-light")
      body.classList.add("theme-dark");
      setLight(false)
      document.cookie = "light=false";
    }
  };

  // const toggleSidebar = () => {
  //   let body = document.body;
  
  //   if(isSidebarOpen) {
  //     body.classList.remove("sidebar-hidden");
  //     body.classList.add("sidebar-fixed");
  //   } else {
  //     body.classList.remove("sidebar-fixed");
  //       body.classList.add("sidebar-hidden");
  //   }
  // }

  useEffect(() => {
    checkCookie();
    toggleTheme();
  }, [getCookie("token"), isLight]);


  const deleteCookie = () => {
    document.cookie = "auth=;";
    document.cookie = "token=;";
    document.cookie = "isAdmin=;";
    document.cookie = "light=";
  };

  const logOut = () => {
    setDatas({
      authenticated: false,
      user: null,
    });
    deleteCookie();
  };

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
      default: break;
    }
  };

  return (
    <div>
      <NotificationContainer />
        <Router>
        {window.location.pathname.includes("admin") ? (
          <Route
            path={"/admin"}
            render={(props) => (
              datas.loading ? (
                <LoadingPage />
              ) : (
                datas.authenticated ? (
                  <Admin {...props}
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={setSidebar}
                    logOut={logOut}
                    notification={createNotification}
                    data={{ user: datas.user }}
                    isLight={isLight}
                    toggleCheck={setLight}
                    toggleTheme={toggleTheme}
                  >
                    <AdminRoutes notification={createNotification} />
                  </Admin>
                ) : (
                  <Login {...props} notification={createNotification} />
                )
            ))}
                
          />
        ) : (
          <Route
            exact
            path="/"
            children={(props) => (
              <Public {...props} isLight={isLight} toggleCheck={setLight} toggleTheme={toggleTheme}>
                <PublicRoutes />
              </Public>
            )}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
