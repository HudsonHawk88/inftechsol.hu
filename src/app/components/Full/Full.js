import React, { Component } from "react";
import { TabPane, TabContent, T } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "../../App.css";
import AdminBase from "../../pages/admin/AdminBase";
import Header from "../../components/Header/Header";

class Full extends Component {
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
    console.log(props.data.user);
    if (props !== {}) {
      this.setState({ user: props.data.user, loading: false }, () => {
        this.setCookie("auth", true, 1);
        this.setCookie("userId", props.data.user.id, 1);
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header
          data={{ user: this.state.user !== {} && this.state.user }}
          logOut={this.props.logOut && this.props.logOut}
        />

        <Router>
          <div className="row">
            <Sidebar className="col-md-2" />
            <div id="main" className="col-md-10">
              <Route
                path="/admin/users"
                render={() => {
                  return (
                    <AdminBase
                      data={{
                        user: this.state.user !== {} && this.state.user,
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default Full;
