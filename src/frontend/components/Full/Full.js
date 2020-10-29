import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import AdminBase from "../../pages/admin/AdminBase";
import Header from "../../components/Header/Header";

class Full extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount = () => {
    console.log("FULL PROPS: ", this.props)
  }

  render() {
   
    return (
      <React.Fragment>
        <Header
          toggleSidebar={this.props && this.props.toggleSidebar}
          data={{ user: this.props.data.user && this.props.data.user }}
          logOut={this.props.logOut && this.props.logOut}
        />
        <div id="main">
          <Router>
            <Sidebar isSidebarOpen={this.props && this.props.isSidebarOpen} />
              <main id="content" className="mx-auto">
                <Route
                  path="/admin/users"
                  render={() => {
                    return (
                      <AdminBase
                        notification={this.props.notification}
                        data={{
                          user: this.props && this.props.data.user,
                        }}
                      />
                    );
                  }}
                />
              </main>
            </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default Full;
