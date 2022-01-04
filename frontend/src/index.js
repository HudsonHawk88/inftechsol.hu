import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import Full from './containers/Full';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Login from "./pages/login/Login";
import Services from "./pages/login/Services";

import './scss/style.scss';

function Main() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [ refreshRate ] = useState(1000*30);
  const token = localStorage.getItem('token');

  const setDefaultTheme = () => {
    const light = localStorage.getItem('isLight');
    if (light) {
      if(light === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      localStorage.setItem('isLight', 'true');
      return true;
    }
    
  };
  const [isLight, setLight] = useState(setDefaultTheme());
  const isAdmin = window.location.pathname.includes('admin');

  const checkLoggedIn = (JWT) => {
    if (JWT) {
      Services.checkAuth().then((res, err) => {
        if (!err) {
          if (res.authenticated === true) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            logout();
            // createNotification('error', res.msg)
          }
        } else {
          setAuthenticated(false);
          logout();
          // createNotification('error', res.msg)
        }
      })  
    }
  }
  const toggleTheme = () => {
    let body = document.body;
    if (isLight === true) {
      body.classList.replace("theme-dark", "theme-light");
      setLight(true);
      localStorage.setItem('isLight', 'true');
    }
    if (isLight === false) {
      body.classList.replace("theme-light", "theme-dark");
      setLight(false);
      localStorage.setItem('isLight', 'false');
    }
  };

  useEffect(() => {
    setDefaultTheme();
    toggleTheme();
  }, [isLight]);

  const refreshToken = () => {
    //every 30 seconds refresh access token
    Services.refreshToken(localStorage.getItem("refreshToken")).then((res, err) => {
        if (!err) {
            localStorage.setItem('token', res.token);
            setUser(res.user);
        }
    });

    setTimeout(refreshToken, refreshRate)
}

  useEffect(() =>{
    if (token) {
      refreshToken();
    }
    checkLoggedIn(token);
  }, [])

  const logout = () => {
    const token = localStorage.getItem('refreshToken');
    Services.logout(token).then((res, err) => {
        if (res.success) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('isLight');
            window.location.href = "/"
        } else {
            createNotification("error", "Váratlan hiba a kijelentkezésnél! Kérjük próbáld meg újra!");
        }
    });
  }
  const createNotification = (type, msg) => {
    switch (type) {
      case 'info':
        NotificationManager.info(msg);
        break;
      case 'success':
        NotificationManager.success(msg);
        break;
      case 'warning':
        NotificationManager.warning(msg);
        break;
      case 'error':
        NotificationManager.error(msg);
        break;
    }
  }

 

  return (
    <Router>
      <NotificationContainer />
            <Route exact path='/' children={(propps) => (
                <Full isAdmin={isAdmin} isLight={isLight} toggleTheme={setLight} logOut={logout} authenticated={authenticated} user={user && user}>
                    {isAdmin ? (
                      authenticated ? (
                        <AdminRoutes notification={createNotification} {...propps} />
                      ) : (
                        <Login setUser={setUser} notification={createNotification} />
                      )
                    ) : (
                      <PublicRoutes notification={createNotification} {...propps} />
                    )}
                </Full>
            )} />
    </Router>
  );
}

export default Main;

ReactDOM.render(
  <Main />,
  document.getElementById("root")
);
