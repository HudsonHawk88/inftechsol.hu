import React, { useState, useEffect } from "react";
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
import FelhasznalokContent from "./FelhasznalokContent";

function FelhasznalokBase() {
  const [activeTab, toggleTab] = useState("1");

  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggleTab("1");
            }}
          >
            Felhasználók
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggleTab("2");
            }}
          >
            Csoportok
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggleTab("3");
            }}
          >
            Jogosultságok
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <FelhasznalokContent
            notification={this.props.notification}
            data={{ user: this.props && this.props.data.user }}
            logOut={this.props.logOut && this.props.logOut}
          />
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
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
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
}

export default FelhasznalokBase;
