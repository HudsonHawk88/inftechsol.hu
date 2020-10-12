import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import Admin from "./Admin";

class AdminBase extends Component {
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
      activeTab: "1",
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

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggleTab("1");
              }}
            >
              Felhasználók
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggleTab("2");
              }}
            >
              Csoportok
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggleTab("3");
              }}
            >
              Jogosultságok
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Admin
              data={{ user: this.state.user !== {} && this.state.user }}
              logOut={this.props.logOut && this.props.logOut}
            />
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default AdminBase;
